/**Form submit action listener**/
function lpFormSubmitHandler(e) {
    var data = e.detail;
    if (data.status == 'success') {
        if (data.submit_action.action_type === '') {
            showHideNotification(true, data.success_msg_text);
        } else if (data.submit_action.action_type === 'lpPopupLink') {
            triggerPopupOnFormSubmit(data.submit_action.elm_id);
        }
        if (typeof gtag_report_conversion === 'function') {
            gtag_report_conversion();
        }
    }
}
document.addEventListener('lpform:submit', lpFormSubmitHandler);

function showHideNotification(val, content) {
    var elements = document.querySelectorAll('.modal-overlay, .modal-container'); //NO I18N
    if (val) {
        elements[0].getElementsByClassName('lpmodal-caption')[0].innerText =
            content && content != ''
                ? content
                : 'Thank you ! Your form has been submitted'; //NO I18N
    }
    for (var i = 0; i < elements.length; i++) {
        if (val) {
            elements[i].classList.add('active');
        } else {
            elements[i].classList.remove('active');
        }
    }
}
