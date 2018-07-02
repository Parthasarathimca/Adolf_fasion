/*
 version:1.0.0
 */
$(function() {
    "use strict";
    $('.open-blogcomment-form').click(function(){
        $("#modalBlogCommentForm").find('#parent_id').val($(this).data('id'));
        $("#modalBlogCommentForm").modal('show');
    });
    /*$('#modalBlogCommentForm').on('hidden.bs.modal', function (e) {
        var frm = $('#psf-frm-comment');
        frm.find('.title').val("").parent().removeClass('has-error has-success');
        frm.find('.user').val("").parent().removeClass('has-error has-success');
        frm.find('.email').val("").parent().removeClass('has-error has-success');
        frm.find('.content').val("").parent().removeClass('has-error has-success');
        psf_remove_ajaxloader();
    });*/
    $('#modalCommentFormAlert').on('hidden.bs.modal', function (e) {
        $("#modalCommentFormAlert .alert-content").html('').removeClass('alert-success alert-danger');
    });

    function psf_add_ajaxloader(e){
        e.closest('.abacana-modal').find('.modal-footer').append('<p class="ajax-loader"><i class="fa fa-spinner fa-spin"></i></p>');
    }
    function psf_remove_ajaxloader(){
        $("p.ajax-loader").remove();
    }
    $(".saveBlogComment:not(.processing)").on('click', function (e) {
        e.preventDefault();
        $(this).addClass('processing');
        var t=$(this), data = $('form#psf-frm-comment').serializeObject(), frm = $('#psf-frm-comment'), error = false;
        data.task = 'saveBlogComment';
        /*if(data.title != ''){
            frm.find('.title').parent().removeClass('has-error').addClass('has-success');
        }else{
            frm.find('.title').parent().removeClass('has-success').addClass('has-error');
            error = true;
        }*/
        if(data.name != ''){
            frm.find('.name').parent().removeClass('has-error').addClass('has-success');
        }else{
            frm.find('.name').parent().removeClass('has-success').addClass('has-error');
            error = true;
        }
        if(data.email != ''){
            if(check_email(data.email) == true){
                frm.find('.email').parent().removeClass('has-error').addClass('has-success');
            }else{
                frm.find('.email').parent().removeClass('has-success').addClass('has-error');
                error = true;
            }
        }else{
            frm.find('.email').parent().removeClass('has-success').addClass('has-error');
            error = true;
        }
        if(data.content != ''){
            frm.find('.content').parent().removeClass('has-error').addClass('has-success');
        }else{
            frm.find('.content').parent().removeClass('has-success').addClass('has-error');
            error = true;
        }
        if(error == true){
            $(this).removeClass('processing');
            return false;
        }
        $.ajax({
            type: "POST",
            cache: false,
            url: psframeworkAjaxUrl,
            dataType : "json",
            data: data,
            beforeSend: function(){},
            complete: function(){},
            success: function (response) {
                t.removeClass('processing');
                frm.find('.title').val("").parent().removeClass('has-error has-success');
                frm.find('.name').val("").parent().removeClass('has-error has-success');
                frm.find('.email').val("").parent().removeClass('has-error has-success');
                frm.find('.content').val("").parent().removeClass('has-error has-success');
                open_psframework_alert(response.status, response.msg);
            }
        });
    });
    $(".saveBlogComment_modal:not(.processing)").on('click', function (e) {
        e.preventDefault();
        $(this).addClass('processing');
        var t=$(this), data = $('form#psf-modalfrm-comment').serializeObject(), frm = $('#psf-modalfrm-comment'), error = false;
        data.task = 'saveBlogComment';
        if(data.name != ''){
            frm.find('.name').parent().removeClass('has-error').addClass('has-success');
        }else{
            frm.find('.name').parent().removeClass('has-success').addClass('has-error');
            error = true;
        }
        if(data.email != ''){
            if(check_email(data.email) == true){
                frm.find('.email').parent().removeClass('has-error').addClass('has-success');
            }else{
                frm.find('.email').parent().removeClass('has-success').addClass('has-error');
                error = true;
            }
        }else{
            frm.find('.email').parent().removeClass('has-success').addClass('has-error');
            error = true;
        }
        if(data.content != ''){
            frm.find('.content').parent().removeClass('has-error').addClass('has-success');
        }else{
            frm.find('.content').parent().removeClass('has-success').addClass('has-error');
            error = true;
        }
        if(error == true){
            $(this).removeClass('processing');
            return false;
        }
        psf_add_ajaxloader($(this));
        $.ajax({
            type: "POST",
            cache: false,
            url: psframeworkAjaxUrl,
            dataType : "json",
            data: data,
            beforeSend: function(){},
            complete: function(){},
            success: function (response) {
                psf_remove_ajaxloader();
                t.removeClass('processing');
                frm.find('.title').val("").parent().removeClass('has-error has-success');
                frm.find('.name').val("").parent().removeClass('has-error has-success');
                frm.find('.email').val("").parent().removeClass('has-error has-success');
                frm.find('.content').val("").parent().removeClass('has-error has-success');
                $('#modalBlogCommentForm').modal('hide');
                open_psframework_alert(response.status, response.msg);

            }
        });
    });
});