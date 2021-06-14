import React from "react";

/**
 * Presentational Component to display Card
 * @param {*} param -
 * data - array of object with card list of each title
 * cardDelete - delete card on click of close icon
 * listKey - index of list 
 * handleDragStart - set index of dragged card and its parent list 
 * @returns - presentation component to display card with drop feature
 */
export const Card = ({ data, cardDelete, listKey,handleDragStart }) => {

    return (
        <div className="App-card-lists"
          >
            {data.length > 0 && data.map((element, index) => {
                return (<div className="App-card-list"
                    key={`app-card-list=${index}`} draggable="true"
                    onDragStart={() => handleDragStart(index,listKey)}>
                    <div className="App-card-header">
                        <div className="App-card-title">{element.title}</div>
                        <div className="App-card-delete">
                            <i className="fa fa-close" onClick={() => cardDelete(index, listKey)} />
                        </div>
                    </div>
                    <div className="App-card-content">{element.desc}</div>
                </div>
                )
            })}


        </div>)
}