import React from 'react';

const items = [
  { number: "1", title: "Argentina"},
  { number: "2", title: "YASS"},
  { number: "3", title: "Tech Girl"},
  { number: "4", title: "Lipstick & Code"},
  { number: "5", title: "Latina"},
 ]
 
 const initialDnDState = {
  draggedFrom: null,
  draggedTo: null,
  isDragging: false,
  originalOrder: [],
  updatedOrder: []
 }

export const DraggableList = () => {

  const [list, setList] = React.useState(items);
  const [dragAndDrop, setDragAndDrop] = React.useState(initialDnDState);
  
  
  // onDragStart fires when an element
  // starts being dragged
  const onDragStart = (event) => {
   const initialPosition = Number(event.currentTarget.dataset.position);
   
   setDragAndDrop({
    ...dragAndDrop,
    draggedFrom: initialPosition,
    isDragging: true,
    originalOrder: list
   });
  }
  
  // onDragOver fires when an element being dragged
  // enters a droppable area.
  // In this case, any of the items on the list
  const onDragOver = (event) => {
   
   // in order for the onDrop
   // event to fire, we have
   // to cancel out this one
   event.preventDefault();
   
   let newList = dragAndDrop.originalOrder;
  
   // index of the item being dragged
   const draggedFrom = dragAndDrop.draggedFrom; 
 
   // index of the droppable area being hovered
   const draggedTo = Number(event.currentTarget.dataset.position); 
 
   const itemDragged = newList[draggedFrom];
   const remainingItems = newList.filter((item, index) => index !== draggedFrom);
 
    newList = [
     ...remainingItems.slice(0, draggedTo),
     itemDragged,
     ...remainingItems.slice(draggedTo)
    ];
     
   if (draggedTo !== dragAndDrop.draggedTo){
    setDragAndDrop({
     ...dragAndDrop,
     updatedOrder: newList,
     draggedTo: draggedTo
    })
   }
 
  }
  
  const onDrop = (event) => {
   
   setList(dragAndDrop.updatedOrder);
   
   setDragAndDrop({
    ...dragAndDrop,
    draggedFrom: null,
    draggedTo: null,
    isDragging: false
   });
  }
 
  const onDragLeave = () => {
    setDragAndDrop({
    ...dragAndDrop,
    draggedTo: null
   });
  }
  
  return(
		<div style={{display: 'flex', flex: 1, flexDirection: 'column', justifyContent:'center', alignItems:'center'}}>
        {list.map( (item, index) => {
          return(
            <div 
              key={index}
              data-position={index}
              draggable
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
              onDragLeave={onDragLeave}
              style={{display:'flex', flex:1, border:'1px solid black', flexDirection:'row', justifyContent:'space-between', alignItems:'center', padding: 5}}
            >
              <p>{index}</p>
              <p>{item.title}</p>
            </div>
          )
        })}
		</div>
		)
}