import React from "react";
import GameManagerCard from "../GameManagerCard/GameManagerCard";
import GameInputForm from "../GameInputForm/GameInputForm";
import Spinner from '../Spinner/Spinner';
import niStore from "../../api/niStore";

class ManagerPage extends React.Component {
    state = {
        shoesList: [],
        isEditing: false,
        inputs: {
            brand: "",
            size: "",
            price: "",
            imgUrl: "",
        },
        spinner: false,
    };

    componentDidMount() {
        this.fetchShoes();
    }

    fetchShoes = async () => {
        this.setState({spinner: true})
        try {
            const shoes = await niStore.get("shoes");
            this.setState({ shoesList: shoes.data, spinner: false });
        } catch (e) {
            console.log(e);
        }
    };

    fetchShoe = async (id) => {
        const shoe = await niStore.get(`shoes/${id}`);
        this.setState({
            inputs: {
                brand: shoe.data.brand,
                size: shoe.data.size,
                price: shoe.data.price,
                imgUrl: shoe.data.imgUrl,
            },
        });
    };

    displayShoes = () => {
        return this.state.shoesList.map((shoe, i) => {
            return (
                <GameManagerCard
                    key={i}
                    id={shoe.id}
                    brand={shoe.brand}
                    price={shoe.price}
                    imgUrl={shoe.imgUrl}
                    handleChangeEdit={this.startEditing}
                    handleButton2={this.handleDelete}
                />
            );
        });
    };

    handleButton1 = (inputRefs) => {
        const newShoe = {};
        for (let data of inputRefs) {
            newShoe[data[1]] = data[0].value;
        }
        if (!this.state.isEditing) {
            this.addToApi(newShoe);
        } else {
            this.updateApi(newShoe, this.state.currentShoe);
            this.stopEditing();
        }
    };

    handleDelete = (id) => {
        this.deleteFromApi(id);
    };

    startEditing = (id) => {
        this.setState({ isEditing: true, currentShoe: id });
        this.fetchShoe(id);
    };

    stopEditing = () => {
        this.setState({ isEditing: false });
    };

    addToApi = async (newShoe) => {
        try {
            await niStore.post("shoes", newShoe);
            this.fetchShoes();
        } catch (e) {
            console.log(e);
        }
    };

    deleteFromApi = async (id) => {
        try {
            await niStore.delete(`shoes/${id}`);
            const data = this.state.shoesList.filter((shoe) => shoe.id !== id);
            this.setState({ shoesList: data });
        } catch (e) {
            console.log(e);
        }
    };

    updateApi = async (newShoe, id) => {
        try {
            await niStore.put(`shoes/${id}`, newShoe);
            const newList = [...this.state.shoesList];
            const index = this.state.shoesList.findIndex(
                (shoe) => shoe.id === id
            );
            newShoe.id = id;
            newList[index] = newShoe;
            this.setState({ shoesList: newList });
        } catch (e) {
            console.log(e);
        }
    };

    changeInputsState = (value, type) => {
        this.setState({ inputs: { [type]: value } });
    };

    clearInputs = () => {
        this.setState({
            inputs: {
                brand: "",
                size: "",
                price: "",
                imgUrl: "",
            },
        });
    };

    render() {
        if (this.state.spinner) {
            return <Spinner />
        } else
        return (
            <div className="manager-page-container">
                <div className="manager-page-input-container">
                    <GameInputForm
                        handleButton1={this.handleButton1}
                        handleButton2={this.stopEditing}
                        currentShoe={this.state.currentShoe}
                        changeInputsState={this.changeInputsState}
                        clearInputs={this.clearInputs}
                        inputs={this.state.inputs}
                    />
                </div>
                <div className="manager-pages-items-container">
                    {this.displayShoes()}
                </div>
            </div>
        );
    }
}

export default ManagerPage;
