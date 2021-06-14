import React from 'react';
import './style.css'
import { Card } from './Card';

/**
 * Presenational Component to display List 
 * @param {*} param 
 * data - array of object containing list with title and card list 
 * openAddCard -   open modal on click of plus icon
 * deleteList - delete list on click of close Icon
 * handleDragStart - set index of dragged card and its parent list 
 * handleDrop - set value of dragged card to target list and delete from prev list
 * @returns - presentational component to display list drop feature
 */
export const List = ({ data, 
    openAddCard ,
    deleteList,
    cardDelete,
    handleDragStart,
    handleDrop}) => {
    return (
        <div className="App-lists">
            {data.length>0 && data.map((element, index) => {
                return (<div className="App-list" key={`app-list-${index}`}                 
                onDrop={(e) => handleDrop(index)}
                onDragOver={(e) => e.preventDefault()}>
                    <div className="App-list-header">
                        <div className="App-list-title">{element.title}</div>
                        <div className="App-list-delete">
                            <i className="fa fa-close" onClick={() => deleteList(index)} />
                        </div>
                    </div>
                    <Card data={element.cards} cardDelete={cardDelete} listKey={index} 
                    handleDragStart={handleDragStart}/>
                    <div className="App-list-footer">
                        <i className="fa fa-plus-circle fa-3x" onClick={() => openAddCard(index)}></i>
                    </div>
                </div>)
            })}
        </div>
    )
}