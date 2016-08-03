var EntryActions = require ('../actions/entryActions');

module.exports =  {
  createEntry: function(details){
    $.ajax({
      method: 'POST',
      url: '/entries',
      data: {entry: details},
      success: function(entry){
        EntryActions.addEntry(entry);
      },
      error: function(error){
        EntryActions.handleError(error);
      }
    });
  },

  fetchEntry: function(id){
    $.ajax({
      method: 'GET',
      url: '/entries/' + id,
      success: function(entry){
        EntryActions.foundEntry(entry);
      },
      error: function(error){
        EntryActions.handleError(error);
      }
    });
  },

  fetchAllEntries: function(){
    $.ajax({
      method: 'GET',
      url: '/entries',
      success: function(entries){
        EntryActions.getAllEntries(entries);
      },
      error: function(error){
        EntryActions.handleError(error);
      }
    });
  },

  deleteEntry: function(id){
    $.ajax({
      method: 'DELETE',
      url: '/entries/' + id,
      success: function(entry){
        EntryActions.removeEntry(entry);
      },
      error: function(error){
        EntryActions.handleError(error);
      }
    });
  },

  updateEntry: function(id, details){
    $.ajax({
      method: 'PATCH',
      url: '/entries/' + id,
      data: {entry: details},
      success: function(entry){
        EntryActions.modifyEntry(entry);
      },
      error: function(error){
        EntryActions.handleError(error);
      }
    });
  },

  fetchEuclidianDistance: function(details){
    $.ajax({
      method: 'GET',
      url: '/guess/euclidian',
      data: {entry: details},
      success: function(guess){
        EntryActions.euclidianDistance(guess);
      },
      error: function(error){
        EntryActions.handleError(error);
      }
    });
  },

  fetchPearsonCorrelationScore: function(details){
    $.ajax({
      method: 'GET',
      url: '/guess/pearson',
      data: {entry: details},
      success: function(guess){
        EntryActions.pearsonCorrelationScore(guess);
      },
      error: function(error){
        EntryActions.handleError(error);
      }
    });
  }
};
