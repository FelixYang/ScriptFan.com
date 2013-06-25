function fmt() {
    var args = arguments;
    return args[0].replace(/%\{(.*?)}/img, function(match, prop) {
        return function(obj, props) {
            var prop = /\d+/.test(props[0]) ? parseInt(props[0]) : props[0];
            if (props.length > 1) {
                return arguments.callee(obj[prop], props.slice(1));
            } else {
                return obj[prop] || '';
            }
        }(typeof args[1] === 'object' ? args[1] : args, prop.split(/\.|\[|\]\[|\]\./));
    });
}

function flash(message, level) {
    var tpl = ''
      + '<div class="alert alert-%{1}">'
      + '  <button type="button" class="close" data-dismiss="alert">×</button>'
      + '  %{2}'
      + '</div>';
    $(fmt(tpl, level, message)).appendTo('.flash').delay(3000).fadeOut();
}

