import React, { useEffect, useState } from 'react';
import { List } from './List';
import { Modal } from './Modal';

/**
 * Component contatins business logic to display, add, 
 * delete, drag and drop of list and card 
 *
 */
export const TrelloBoard = () => {
    const initialCardDetails = {
        title: '',
        desc: '',
        time: ''
    }
    const initialDraggedCard={
        cardIndex: null,
        listIndex: null
    }
    // set the data to display list and cards
    const [list, setList] = useState(JSON.parse(localStorage.getItem('list')) || []);
    // show or hide modal for adding list
    const [display, setDisplay] = useState(false);
    // list to which card to be added on click of +
    const [activeList, setActiveList] = useState(null);
    // set the data of new card to be added
    const [cardDetails, setCardDetails] = useState(initialCardDetails)
    // set the title for new list to be added
    const [listTitle, setListTitle] = useState('');
    // show or hide modal for adding card
    const [displayListModal, setDisplayListModal] = useState(false);
    // set the index of draggerd card and its parent list
    const [draggedCard, setDraggedCard] = useState(initialDraggedCard)

    /**
     * Function to open modal to enter
     * new card details
     * @param {*} index - list index
     */
    const openAddCard = (index) => {
        setDisplay(true);
        setActiveList(index)
    }
    /**
     * Function to close all open modal
     */
    const onCloseModal = () => {
        setDisplay(false)
        setDisplayListModal(false);
        setCardDetails(initialCardDetails);
        setListTitle('');
    }
    /**
     * Function to save and add new card
     * @param {*} e - event
     */
    const onSaveCardModal = (e) => {
        e.preventDefault();
        var data = [...list]
        let cardValue = { ...cardDetails };
        cardValue['time'] = new Date().getTime();
        data[activeList].cards.push(cardValue);
        setList(data);
        onCloseModal();
    }
    /**
     * Function to set value for new card details
     * title and description
     * @param {*} e - event
     * @param {*} name -field name
     */
    const onChangeCardDetails = (e, name) => {
        let value = e.target.value;
        let data = { ...cardDetails };
        data[name] = value;
        setCardDetails(data)
    }
    /**
     * Function to save and create new list
     * @param {*} e - event
     */
    const onSaveListdModal = (e) => {
        e.preventDefault();
        var data = [...list];
        data.push({
            title: listTitle,
            cards: []
        });
        setList(data);
        onCloseModal()
    }
    /**
     * Function to delete list on click
     * of close icon
     * @param {*} index - list index 
     */
    const deleteList = (index) => {
        let data = [...list]
        data.splice(index, 1);
        setList(data);
    }
    /**
     * Function to delete card on click
     * of close icon
     * @param {*} index - card index
     * @param {*} listKey - parent list index
     */
    const cardDelete = (index, listKey) => {
        let data = [...list]
        data[listKey].cards.splice(index, 1);
        setList(data);
    }
    /**
     * Function to set dragged card
     * index and its parent list index
     * @param {*} index - card index
     * @param {*} listKey - parent card index
     */
    const handleDragStart = (index, listKey) => {
        setDraggedCard({
            cardIndex: index,
            listIndex: listKey
        })
    };
    /**
     * Function to add dragged card to target list 
     * and drop from previous list
     * @param {*} index - target list index
     */
    const handleDrop = ( index) => {
        let data=[...list]
        data[index].cards.push(data[draggedCard.listIndex].cards[draggedCard.cardIndex]);
        let sortedData= data[index].cards.sort((a, b) => {
            if (a.time < b.time) return -1
            return a.time > b.time ? 1 : 0
          });
        data[index].cards=[...sortedData]
        data[draggedCard.listIndex].cards.splice(draggedCard.cardIndex, 1);
        setList(data)
        setDraggedCard(initialDraggedCard);
    };
    /**
     * update local storage whenever list state get change
     */
    useEffect(() => {
        if (list) {
            localStorage.setItem('list', JSON.stringify(list));
        }
    }, [list])

    return (
        <section className="App-section">
            <div className="App-button">
                <button onClick={() => setDisplayListModal(true)} >ADD LIST</button>
            </div>
            <List
                data={list}
                openAddCard={openAddCard}
                deleteList={deleteList}
                cardDelete={cardDelete}
                handleDragStart={handleDragStart}
                handleDrop={handleDrop}
            />
            <Modal
                display={display}
                title="Enter Card Details"
                onClose={onCloseModal}
                onSave={onSaveCardModal}
            >
                <div className="card-modal">
                    <label className="card-label">
                        Enter Card Title:
                    </label>  <input type="text"
                        value={cardDetails.title}
                        placeholder="Enter Card Title"
                        onChange={(e) => onChangeCardDetails(e, "title")}
                        required />
                </div>
                <div className="card-modal card-desc">
                    <label className="card-label">
                        Enter Card Description:
                  </label>
                    <textarea type="text"
                        value={cardDetails.desc}
                        placeholder="Enter Card Description"
                        rows={4}
                        cols={18}
                        className="modal-textarea"
                        onChange={(e) => onChangeCardDetails(e, "desc")}
                        required />
                </div>
            </Modal>
            <Modal
                display={displayListModal}
                title="Enter List Details"
                onClose={onCloseModal}
                onSave={onSaveListdModal}
            >
                <div className="card-modal">
                    <label className="card-label">
                        Enter List Title:
                    </label>  <input type="text"
                        value={listTitle}
                        placeholder="Enter List Title"
                        onChange={(e) => setListTitle(e.target.value)}
                        required />
                </div>
            </Modal>
        </section>
    )
}