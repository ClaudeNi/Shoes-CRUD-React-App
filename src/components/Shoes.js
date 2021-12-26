import React from "react";
import ListItem from "./ListItem";
import shoes from "../api/shoes";

class Shoes extends React.Component {
    state = { list: [], isAddingItem: false };

    componentDidMount() {
        this.fetchItems();
    }

    fetchItems = async () => {
        const fetchedData = await shoes.get("shoes");
        for (let item of fetchedData.data) {
            item.button1 = "Edit";
            item.button2 = "Delete";
        }
        this.setState({ list: fetchedData.data });
    };

    addItem = () => {
        if (!this.state.isAddingItem) {
            const newList = this.state.list;
            newList.push({
                brand: "",
                size: "",
                price: "",
                imgUrl: "",
                edit: true,
                button1: "Add",
                button2: "Cancel",
            });
            this.setState({ list: newList, isAddingItem: true });
        }
    };

    handleEdit = (
        {
            target: {
                attributes: {
                    itemID: { value },
                },
            },
        },
        refsArr
    ) => {
        const newList = this.state.list;
        const newItem = newList[value];
        if (refsArr && refsArr[0].current.value !== "") {
            if (this.state.isAddingItem || newItem.edit) {
                newItem.brand = refsArr[0].current.value;
                newItem.size = refsArr[1].current.value;
                newItem.price = refsArr[2].current.value;
                newItem.imgUrl = refsArr[3].current.value;
            }
        } else {
            newItem.button1 = "Accept";
            newItem.button2 = "Cancel";
        }
        if (refsArr) {
            newItem.button1 = "Edit";
            newItem.button2 = "Delete";
        }
        newItem.edit = !newItem.edit;
        newList[value] = newItem;
        newList[value] = newItem;
        this.setState({
            list: newList,
            isAddingItem: false,
        });
    };

    deleteItem = ({
        target: {
            attributes: {
                itemID: { value },
            },
        },
    }) => {
        const newList = this.state.list;
        const newItem = newList[value];
        if (newItem.edit && !this.state.isAddingItem) {
            newItem.edit = false;
            newItem.button1 = "Edit";
            newItem.button2 = "Delete";
        } else {
            newList.splice(value, 1);
        }
        this.setState({ list: newList, isAddingItem: false });
    };

    displayList = () => {
        return this.state.list.map((item, i) => {
            return (
                <ListItem
                    key={i}
                    id={i}
                    itemData={item}
                    handleButton1={this.handleEdit}
                    handleButton2={this.deleteItem}
                />
            );
        });
    };

    render() {
        return (
            <div className="todo-container">
                <span className="title">Shooooooooooes</span>
                <div className="todo-list">{this.displayList()}</div>
                <div className="btn" onClick={this.addItem}>
                    Add
                </div>
            </div>
        );
    }
}

export default Shoes;
