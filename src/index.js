const appState = {
  title: {
    text: '小书',
    color: 'red'
  },
  content: {
    text: '小书内容',
    color: 'blue'
  }
};

function renderTitle(title) {
  const titleDOM = document.getElementById('title');
  titleDOM.innerHTML = title.text;
  titleDOM.style.color = title.color;
}
function renderContent(content) {
  const contentDOM = document.getElementById('content');
  contentDOM.innerHTML = content.text;
  contentDOM.style.color = content.color;
}
function renderApp(appState) {
  renderTitle(appState.title);
  renderContent(appState.content);
}

renderApp(appState);