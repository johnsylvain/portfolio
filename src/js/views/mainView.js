import controller from '../controller';
import events from '../utils/events';

events.on('viewInit', data => {
  view.init();
})

var view = {
  init() {
    this.dateElem = document.getElementById('date');
    this.dateElem.innerHTML = controller.getDate();

  }
}

export default view;
