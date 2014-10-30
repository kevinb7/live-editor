this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};
this["Handlebars"]["templates"]["image-modal"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n      <li ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.$first), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "><a href=\"#im-class-"
    + escapeExpression((helper = helpers.slugify || (depth0 && depth0.slugify),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.className), options) : helperMissing.call(depth0, "slugify", (depth0 && depth0.className), options)))
    + "\">";
  if (helper = helpers.className) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.className); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a></li>\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "class=\"active\"";
  }

function program4(depth0,data,depth1) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n      <div class=\"tab-pane ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.$first), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" id=\"im-class-"
    + escapeExpression((helper = helpers.slugify || (depth0 && depth0.slugify),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.className), options) : helperMissing.call(depth0, "slugify", (depth0 && depth0.className), options)))
    + "\">\n        <div class=\"imagemodal-content\">\n        <div style=\"position: relative;\">\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.groups), {hash:{},inverse:self.noop,fn:self.programWithDepth(7, program7, data, depth1),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n        </div>\n\n        <div class=\"right\">\n        <ul class=\"nav nav-pills nav-stackable\">\n        ";
  stack1 = (helper = helpers.patchedEach || (depth0 && depth0.patchedEach),options={hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.groups), options) : helperMissing.call(depth0, "patchedEach", (depth0 && depth0.groups), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </ul>\n        </div>\n\n        <div style=\"clear: both;\"></div>\n      </div>\n    ";
  return buffer;
  }
function program5(depth0,data) {
  
  
  return "active";
  }

function program7(depth0,data,depth2) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n            <div class=\"image-group\">\n                <h3 class=\"image-group\" id=\"im-group-"
    + escapeExpression((helper = helpers.slugify || (depth0 && depth0.slugify),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.groupName), options) : helperMissing.call(depth0, "slugify", (depth0 && depth0.groupName), options)))
    + "\">";
  if (helper = helpers.groupName) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.groupName); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h3>\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.cite), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.images), {hash:{},inverse:self.noop,fn:self.programWithDepth(10, program10, data, depth0, depth2),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </div>\n        ";
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                    <p><a href=\"";
  if (helper = helpers.citeLink) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.citeLink); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" target=\"_blank\">";
  if (helper = helpers.cite) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cite); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a></p>\n                ";
  return buffer;
  }

function program10(depth0,data,depth1,depth3) {
  
  var buffer = "", stack1;
  buffer += "\n                <div class=\"image\" data-path=\""
    + escapeExpression(((stack1 = (depth1 && depth1.groupName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\">\n                    <div class=\"thumb-shell\"><img src=\"/images/throbber.gif\" data-lazy-src=\""
    + escapeExpression(((stack1 = (depth3 && depth3.imagesDir)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + escapeExpression(((stack1 = (depth1 && depth1.groupName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + escapeExpression(((stack1 = (depth1 && depth1.thumbsDir)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + ".png\"/></div>\n                    <span class=\"name\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</span>\n                </div>\n                ";
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n            <li ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.$first), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "><a href=\"#im-group-"
    + escapeExpression((helper = helpers.slugify || (depth0 && depth0.slugify),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.groupName), options) : helperMissing.call(depth0, "slugify", (depth0 && depth0.groupName), options)))
    + "\">";
  if (helper = helpers.groupName) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.groupName); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a></li>\n        ";
  return buffer;
  }

function program14(depth0,data) {
  
  
  return "Close";
  }

function program16(depth0,data) {
  
  
  return "Ok";
  }

  buffer += "<div class=\"modal imagemodal\">\n    <ul class=\"nav nav-tabs\" role=\"tablist\">\n    ";
  stack1 = (helper = helpers.patchedEach || (depth0 && depth0.patchedEach),options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.classes), options) : helperMissing.call(depth0, "patchedEach", (depth0 && depth0.classes), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </ul>\n\n    <div class=\"tab-content\">\n    ";
  stack1 = (helper = helpers.patchedEach || (depth0 && depth0.patchedEach),options={hash:{},inverse:self.noop,fn:self.programWithDepth(4, program4, data, depth0),data:data},helper ? helper.call(depth0, (depth0 && depth0.classes), options) : helperMissing.call(depth0, "patchedEach", (depth0 && depth0.classes), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n\n    <div class=\"imagemodal-footer\">\n      <button type=\"button\" class=\"simple-button\" data-dismiss=\"modal\">";
  options={hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data}
  if (helper = helpers._) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0._); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers._) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</button>\n      <button type=\"button\" class=\"simple-button green imagemodal-submit\" data-dismiss=\"modal\">";
  options={hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data}
  if (helper = helpers._) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0._); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers._) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</button>\n    </div>\n</div>";
  return buffer;
  });;