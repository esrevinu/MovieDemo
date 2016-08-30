$(function(){
    $('.comment').click(function(e){
        var target = $(this);
        var toId = target.data('tid');
        var commentId = target.data('cid');
        if($('#toId').length > 0 ) {
            $('#toId').val(toId);
        }else{
            $('<input>').attr({
                type: 'hidden',
                id:'toId',
                name: 'comment[tid]',
                value: toId
            }).appendTo('#commentForm');
        }

        if($('#commentId').length > 0 ) {
            $('#commentId').val(commentId);
        }else{
            $('<input>').attr({
                type: 'hidden',
                id:'commentId',
                name: 'comment[cid]',
                value: commentId
            }).appendTo('#commentForm');
        }

        //Add the "toUser" in textarea as placeholder
        var toUser = $(this)
            .parent()
            .next()
            .children('.media-heading')
            .find("span:first-child")
            .text();
        console.log(toUser);
        //rawString may be "sven" or "回复：sven"
        $("textarea[name='comment[content]']").attr('placeholder','回复:'+toUser);

    })
})