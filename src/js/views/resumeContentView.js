import controller from '../controller';
import events from '../utils/events';
import filters from '../utils/filters';


events.on('resumeContentViewInit', data => {
  resumeContentView.init();
})
events.on('resumeContentViewRender', data => {
  resumeContentView.render();
})

var resumeContentView = {
  init(){
    this.resumeContainerElem = document.getElementById('resume-code');
    this.render();
  },

  render(){
    let data = controller.getCurrentOutput();
    let json = filters.textToJSON(JSON.stringify(data,null,'   '));
    json = filters.findUrls(json);
    this.resumeContainerElem.innerHTML = json;
  }
}

export default resumeContentView;
