var AppDispatcher = require('../dispatcher/dispatcher');
var EntryConstants = require('../constants/entryConstants');

module.exports = {
  addEntry: function(entry){
    AppDispatcher.dispatch({
      actionType: EntryConstants.ENTRY_CREATED,
      entry: entry
    });
  },

  foundEntry: function(entry){
    AppDispatcher.dispatch({
      actionType: EntryConstants.ENTRY_FOUND,
      entry: entry
    });
  },

  getAllEntries: function(entries){
    AppDispatcher.dispatch({
      actionType: EntryConstants.ENTRIES_RECEIVED,
      entries: entries
    });
  },

  removeEntry: function(entry){
    AppDispatcher.dispatch({
      actionType: EntryConstants.ENTRY_DELETED,
      entry: entry
    });
  },

  modifyEntry: function(entry){
    AppDispatcher.dispatch({
      actionType: EntryConstants.ENTRY_MODIFIED,
      entry: entry
    });
  },

  handleError: function(error) {
    console.log(error);
    AppDispatcher.dispatch({
      actionType: EntryConstants.ENTRY_ERROR,
      errors: error.responseJSON.errors
    });
  }

};
