//foreach dragndrop create a new dragndrop object->assign IDs for each drag item and drop item
//->assign event listener->assign num of attempts

$(".drag").draggable({
    revert: function(dropped) {
        if(!dropped){
            return true;
        }
        let dropContainer = dropped;
        return validateDragNDrop(dropContainer, $(this));
    }
});
$(".drop").droppable({
    accept: '.drag'
});
function validateDragNDrop(dropContainer, draggable){
    //answer is correct, add one point & remove draggable and add it to droppable
    let q = dropContainer.parent('.question');
    if(dropContainer.data('correct') === draggable.data('id')){
        //add draggable to container
        // dropContainer.append(draggable);
        //disable draggable
        draggable.draggable('disable');
        //add points
        let points = q.data('points');
        q.data('points', points+1);
        return false;
    }
    let attempts = q.data('attempts');
    if(attempts == 0){
        q.children('.drag').each(function(){
            $(this).draggable('disable');
        })
    }
    else{
        q.data('attempts', --attempts);
    }
    return true;
}