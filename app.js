var model = {
  data: {
    title: "John Sylvain's Resume",
    contact:{
      email: "me@johnsylva.in",
      phone: "(313) 618.0632"
    }
  }
}

var controller = {
  init: function(){
    resumeContentView.init();
  },
  getResumeData: function(){
    return model.data;
  }
}

var resumeContentView = {
  init: function(){
    this.resumeContainerElem = document.getElementById('resume-code');
    this.render();
  },

  render: function(){
    var data = controller.getResumeData();
    var json = JSON.stringify(data);
    // this.resumeContainerElem.textContent = json;
  }
}
controller.init();