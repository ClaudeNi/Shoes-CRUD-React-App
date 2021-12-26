import React from "react";
import Btn from "../Btn/Btn";
import "./gameManagerCard.css";

const GameManagerCard = (props) => {
    const handleClick = () => {
        props.handleChangeEdit(props.id);
        console.log(props);
    };

    return (
        <div className="game-manager-container">
            <img src={props.imgUrl} alt={props.brand} />
            <span className="game-manager-name">{props.brand}</span>
            <span className="game-manager-name">{props.price} &#8362;</span>
            <div className="btns-container">
                <Btn text="Edit" clickHandle={handleClick} />
                <Btn
                    text="Delete"
                    clickHandle={() => {
                        props.handleButton2(props.id);
                    }}
                />
            </div>
        </div>
    );
};

export default GameManagerCard;
