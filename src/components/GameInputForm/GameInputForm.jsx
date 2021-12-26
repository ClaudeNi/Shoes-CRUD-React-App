import React from "react";
import Btn from "../Btn/Btn";
import "./gameInputForm.css";

class GameInputForm extends React.Component {
    brandRef = React.createRef();
    sizeRef = React.createRef();
    priceRef = React.createRef();
    imgUrlRef = React.createRef();

    inputHandle = ({ target: { value } }, type) => {
        this.props.changeInputsState(value, type);
    };

    handleButton1 = (inputRefs) => {
        this.props.handleButton1(inputRefs);
        this.clearInputs();
    };

    handleButton2() {
        this.props.handleButton2();
        this.clearInputs();
    }

    clearInputs = () => {
        this.props.clearInputs();
    };

    render() {
        const inputRefs = [
            [this.brandRef.current, "brand"],
            [this.sizeRef.current, "size"],
            [this.priceRef.current, "price"],
            [this.imgUrlRef.current, "imgUrl"],
        ];
        return (
            <div className="input-container">
                <div className="input-item">
                    Brand:{" "}
                    <input
                        ref={this.brandRef}
                        onChange={(e) => this.inputHandle(e, "brand")}
                        value={this.props.inputs.brand}
                    ></input>
                </div>
                <div className="input-item">
                    Size:{" "}
                    <input
                        ref={this.sizeRef}
                        onChange={(e) => this.inputHandle(e, "size")}
                        value={this.props.inputs.size}
                    ></input>
                </div>
                <div className="input-item">
                    Price:{" "}
                    <input
                        ref={this.priceRef}
                        type={"number"}
                        onChange={(e) => this.inputHandle(e, "price")}
                        value={this.props.inputs.price}
                    ></input>
                </div>
                <div className="input-item">
                    Image Url:{" "}
                    <input
                        ref={this.imgUrlRef}
                        onChange={(e) => this.inputHandle(e, "imgUrl")}
                        value={this.props.inputs.imgUrl}
                    ></input>
                </div>
                <div className="input-btns">
                    <Btn
                        text="Add"
                        clickHandle={() => {
                            this.handleButton1(inputRefs);
                        }}
                    />
                    <Btn
                        text="Cancel"
                        clickHandle={() => {
                            this.handleButton2();
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default GameInputForm;
