import React from "react";

class ListItem extends React.Component {
    brandRef = React.createRef();
    sizeRef = React.createRef();
    priceRef = React.createRef();
    imgRef = React.createRef();

    handleButton1 = (e) => {
        const refsArr = [
            this.brandRef,
            this.sizeRef,
            this.priceRef,
            this.imgRef,
        ];
        this.props.handleButton1(e, refsArr);
    };

    render() {
        return (
            <div className="list-item">
                <div className="list-item-left">
                    {this.props.itemData.edit && (
                        <div>
                            <div>
                                <span>Brand: </span>
                                <input
                                    ref={this.brandRef}
                                    className="edit-box"
                                    autoFocus
                                ></input>
                            </div>
                            <div>
                                <span>Size: </span>
                                <input
                                    ref={this.sizeRef}
                                    className="edit-box"
                                ></input>
                            </div>
                            <div>
                                <span>Price: </span>
                                <input
                                    ref={this.priceRef}
                                    className="edit-box"
                                ></input>
                            </div>
                            <div>
                                <span>Image Url: </span>
                                <input
                                    ref={this.imgRef}
                                    className="edit-box"
                                ></input>
                            </div>
                        </div>
                    )}
                    {!this.props.itemData.edit && (
                        <div className="item">
                            <img
                                src={this.props.itemData.imgUrl}
                                alt={this.props.itemData.brand}
                            />
                            <div className={"item-details"}>
                                {this.props.itemData.brand}
                                {this.props.itemData.size}
                                {this.props.itemData.price}
                            </div>
                        </div>
                    )}
                </div>
                <div className="list-item-right">
                    <div
                        role={"button"}
                        id={this.props.id}
                        itemID={this.props.id}
                        className="btn"
                        onClick={this.handleButton1}
                    >
                        {this.props.itemData.button1}
                    </div>
                    <div
                        role={"button"}
                        id={this.props.id}
                        itemID={this.props.id}
                        className="btn"
                        onClick={this.props.handleButton2}
                    >
                        {this.props.itemData.button2}
                    </div>
                </div>
            </div>
        );
    }
}

export default ListItem;
