var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var EntryConstants = require('../constants/entryConstants');

var _entries = {};
var _errors = [];
var _guesses = {};
var EntryStore = new Store(AppDispatcher);

EntryStore.all = function () {
  return Object.assign({}, _entries);
};

EntryStore.find = function(id){
  return Object.assign({}, _entries[id]);
};

EntryStore.getErrors = function(){
  return  _errors.slice(0);
};

EntryStore.getGuesses = function(){
  return Object.assign({}, _guesses);
};

var resetEntries = function(entries){
  _entries = entries;
};

var addEntry = function(entry){
  _entries[entry.id] = entry;
};

var removeEntry = function(entry){
  delete _entries[entry.id];
};

var updateEntry = function(entry){
  _entries[entry.id] = entry;
};

var resetErrors = function(errors){
  _errors = errors;
};

var setEuclidianGuess = function(guess){
  _guesses["euclidian"] = guess.catLover;
};

var setPearsonGuess = function(guess){
  _guesses["pearson"] = guess.catLover;
};

var setTanimotoGuess = function(guess){
  _guesses["tanimoto"] = guess.catLover;
};

var setGuesses = function(guesses){
  _guesses = guesses;
};


EntryStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case EntryConstants.ENTRY_CREATED :
      addEntry(payload.entry);
      EntryStore.__emitChange();
      break;

    case EntryConstants.ENTRY_FOUND :
      updateEntry(payload.entry);
      EntryStore.__emitChange();
      break;

    case EntryConstants.ENTRIES_RECEIVED :
      resetEntries(payload.entries);
      EntryStore.__emitChange();
      break;

    case EntryConstants.ENTRY_DELETED:
      removeEntry(payload.entry);
      EntryStore.__emitChange();
      break;

    case EntryConstants.ENTRY_MODIFIED:
      updateEntry(payload.entry);
      EntryStore.__emitChange();
      break;

    case EntryConstants.EUCLIDIAN:
      setEuclidianGuess(payload.guess);
      EntryStore.__emitChange();
      break;

    case EntryConstants.PEARSON:
      setPearsonGuess(payload.guess);
      EntryStore.__emitChange();
      break;

    case EntryConstants.TANIMOTO:
      setTanimotoGuess(payload.guess);
      EntryStore.__emitChange();
      break;

    case EntryConstants.ALL_GUESSES:
      setGuesses(payload.guesses);
      EntryStore.__emitChange();
      break;

    case EntryConstants.ENTRY_ERROR:
      resetErrors(payload.errors);
      EntryStore.__emitChange();
      break;
  }
};

module.exports = EntryStore;
