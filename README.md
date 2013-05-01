DropAhead
=========

Simple type ahead style JQuery plugin that filters in a select list instead of a dropdown.

Ridiculously similar to Twitter Bootstrap TypeAhead, because it was the inspiration.


Initialize like so on any text input.  


     $('#text').dropahead({
        source: data,
        items: 5,
        select: '#drop',
        unmatched: 'Nothing'
    })


Source: The data source to query against. May be an array of strings or a function. The function is passed two arguments, the query value in the input field and the process callback. The function may be used synchronously by returning the data source directly or asynchronously via the process callback's single argument.

Items: The max number of items to display in the dropdown.

Select: The select list id to display the filtered results

Unmatched: The phrase to display in the select list when there are no matches
