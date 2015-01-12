this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};
this["Handlebars"]["templates"]["image-modal-preview"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, self=this, functionType="function", blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  
  return "Pick Image:";
  }

  buffer += "<div class=\"tooltip imagemodal-preview\">\n	<div class=\"content\">\n		<img src=\"/images/throbber.gif\" class=\"thumb-throbber\" />\n		<div class=\"thumb-shell\"><img class=\"thumb\" /><div class=\"thumb-error\"></div></div> \n		<button class=\"kui-button kui-button-submit kui-button-primary\" style=\"padding: 5px; width: 100%; margin: 0 auto;\" >\n			";
  options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}
  if (helper = helpers._) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0._); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers._) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</button> \n	</div>\n	<div class=\"arrow\"></div>\n</div>";
  return buffer;
  });;