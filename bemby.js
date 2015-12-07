function BEMby (block, where, clone) {

    // console.log(this);
    if (clone) {
        this.blockName = clone.blockName;
        this.elemName = clone.elemName;
        this.$ = clone.$;
        // this.$block = clone.$block;
    }
    else {
        this.blockName = block;
        this.elemName = false;

        // Если необходимо найти блок в jQuery-инстансе
        if (where && where !== false) {
            this.$ = where.find('.' + this.blockName);
        }
        else {
            this.$ = $('.' + this.blockName);
        }
    }
    this.className = '' + this.blockName;
    this.className += this.elemName ? '__' + this.elemName : '';

    this.target = '.' + this.className;

    // console.log(this);


    // console.log(this.$);


    // this.buildClassName = function (params) {
    //     var str = "";
    //     if (params.block) {
    //         str += params.block;
    //     } else {
    //         str += this.blockName;
    //     }
    //     if (params.elem) {
    //         str += '__' + params.elem
    //     }
    // }

    // this.find = function (params) {
    //     var className = this.buildClassName(params);
    //     this.$ = this.$.find('.' + className);
    //     return this;
    // }
    // this.$ = (function(){
    //     if (this.elemName)
    // })();

    // this.instance = function () {
    //     return new BEMby (false, false, this);
    // }

    return this
};

BEMby.prototype.findBlock = function (blockName) {
    return new BEMby (blockName, this.$);
}

BEMby.prototype.on = function (event, callback) {
    var _this = this;
    this.$.on(event, function () {
        var itemObject = jQuery.extend({}, _this);
        itemObject.$ = $(this);
        return callback.call(itemObject);
    });
    return this;
}

BEMby.prototype.delMod = function (param) {
    var classes = this.$.attr('class').split(' ');

    if (this.elemName) {
        var reg = new RegExp(this.blockName + '__' + this.elemName + '_' + param);
    } else {
        var reg = new RegExp(this.blockName + '_' + param);
    }

    for (var i in classes) {
        if (classes[i].match(reg)) {
            this.$.removeClass(classes[i]);
        }
    }
}

BEMby.prototype.elem = function (elemName) {
    return new BEMby (false, false, {
        blockName: this.blockName,
        elemName: elemName,
        $: this.$.find('.' + this.blockName + '__' + elemName),
        // $block: this.$block,
    });
}

BEMby.prototype.setMod = function (param, value) {
    this.delMod(param);
    if (value == false) {
        return this;
    }

    // Установка нового модификатора
    var paramName = this.className + '_' + param;
    if (value !== undefined && value !== true) {
        paramName += '_' + value;
    }

    // console.log(className, value);
    this.$.addClass(paramName);
    return this;
}

BEMby.prototype.mod = BEMby.prototype.setMod;

BEMby.prototype.hasMod = function (param, value) {
    var className = this.blockName;
    if (this.elemName) {
        className += '__' + this.elemName;
    }
    if (value !== false) {
        if (value && value !== true) {
            param += '_' + value;
        }
        // console.log(className + '_' + param);
        // console.log(this.$.hasClass(className + '_' + param));
        return this.$.hasClass(className + '_' + param);
    }
    else {
        return !this.$.hasClass(className + '_' + param);
    }
}
