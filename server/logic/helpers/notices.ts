let noticesList = [];


function addNotice(err) {
    noticesList.push(err.toString());
}
function printNotices() {
    return noticesList.map(it => console.log(it))
}
export {addNotice, printNotices};
