!function ($) {

    "use strict"; // jshint ;_;


    /* DROPAHEAD PUBLIC CLASS DEFINITION
     * ================================= */

    var Dropahead = function (element, options) {
        this.$element = $(element)
        this.options = $.extend({}, $.fn.dropahead.defaults, options)
        this.matcher = this.options.matcher || this.matcher
        this.sorter = this.options.sorter || this.sorter
        this.highlighter = this.options.highlighter || this.highlighter
        this.updater = this.options.updater || this.updater
        this.source = this.options.source
        this.$menu = $(this.options.select)
        this.$unmatched = $('<option>').text(this.options.unmatched || this.unmatched)
        this.$menu.html(this.$unmatched)
        this.listen()
    }

    Dropahead.prototype = {

        constructor: Dropahead

    , updater: function (item) {
        return item
    }

    , lookup: function (event) {
        var items

        this.query = this.$element.val()

        if (!this.query || this.query.length < this.options.minLength) {

            this.$menu.html(this.$unmatched)
            return this
        }

        items = $.isFunction(this.source) ? this.source(this.query, $.proxy(this.process, this)) : this.source

        return items ? this.process(items) : this
    }

    , process: function (items) {
        var that = this

        items = $.grep(items, function (item) {
            return that.matcher(item)
        })

        items = this.sorter(items)

        if (!items.length) {
            this.$menu.html(this.$unmatched)
            return this
        }

        return this.render(items.slice(0, this.options.items))
    }

    , matcher: function (item) {
        return ~item.toLowerCase().indexOf(this.query.toLowerCase())
    }

    , sorter: function (items) {
        var beginswith = []
          , caseSensitive = []
          , caseInsensitive = []
          , item

        while (item = items.shift()) {
            if (!item.toLowerCase().indexOf(this.query.toLowerCase())) beginswith.push(item)
            else if (~item.indexOf(this.query)) caseSensitive.push(item)
            else caseInsensitive.push(item)
        }

        return beginswith.concat(caseSensitive, caseInsensitive)
    }

    , highlighter: function (item) {
        var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')
        return item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
            return '<strong>' + match + '</strong>'
        })
    }

    , render: function (items) {
        var that = this

        items = $(items).map(function (i, item) {
            i = $(that.options.item).val(item)
            i.html(that.highlighter(item))
            return i[0]
        })

        this.$menu.html(items)
        return this
    }

    , listen: function () {
        this.$element.on('keyup', $.proxy(this.keyup, this))
    }

    , keyup: function (e) {
        this.lookup()
        e.stopPropagation()
        e.preventDefault()
    }

    }


    /* DROPAHEAD PLUGIN DEFINITION
     * =========================== */

    var old = $.fn.dropahead

    $.fn.dropahead = function (option) {
        return this.each(function () {
            var $this = $(this)
              , data = $this.data('dropahead')
              , options = typeof option == 'object' && option
            if (!data) $this.data('dropahead', (data = new Dropahead(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }

    $.fn.dropahead.defaults = {
        source: []
    , items: 5
    , select: '<select></select>'
    , item: '<option></option>'
    , unmatched: 'No Matches'
    , minLength: 1
    }

    $.fn.dropahead.Constructor = Dropahead


    /* DROPAHEAD NO CONFLICT
     * =================== */

    $.fn.dropahead.noConflict = function () {
        $.fn.dropahead = old
        return this
    }

}(window.jQuery);


