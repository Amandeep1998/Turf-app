const mongoose = require('mongoose');

//DaySchema
var DaySchema = new mongoose.Schema({
  sunday: {
    morningTimeArray: [{
      time: {
        type: String
      },
      price: {
        type: String
      },
      available: {
        type: Boolean
      }
    }],
    eveningTimeArray: [{
      time: {
        type: String
      },
      price: {
        type: String
      },
      available: {
        type: Boolean
      }
    }],
    nightTimeArray: [{
      time: {
        type: String
      },
      price: {
        type: String
      },
      available: {
        type: Boolean
      }
    }],
  },
  monday: {
    morningTimeArray: [{
      time: {
        type: String
      },
      price: {
        type: String
      }
    }],
    eveningTimeArray: [{
      time: {
        type: String
      },
      price: {
        type: String
      }
    }],
    nightTimeArray: [{
      time: {
        type: String
      },
      price: {
        type: String
      }
    }],
  },
  tuesday: {
    morningTimeArray: [{
      time: {
        type: String
      },
      price: {
        type: String
      },
      available: {
        type: Boolean
      }
    }],
    eveningTimeArray: [{
      time: {
        type: String
      },
      price: {
        type: String
      },
      available: {
        type: Boolean
      }
    }],
    nightTimeArray: [{
      time: {
        type: String
      },
      price: {
        type: String
      },
      available: {
        type: Boolean
      }
    }],
  },
  wednesday: {
    morningTimeArray: [{
      time: {
        type: String
      },
      price: {
        type: String
      },
      available: {
        type: Boolean
      }
    }],
    eveningTimeArray: [{
      time: {
        type: String
      },
      price: {
        type: String
      },
      available: {
        type: Boolean
      }
    }],
    nightTimeArray: [{
      time: {
        type: String
      },
      price: {
        type: String
      },
      available: {
        type: Boolean
      }
    }],
  },
  thursday: {
    morningTimeArray: [{
      time: {
        type: String
      },
      price: {
        type: String
      },
      available: {
        type: Boolean
      }
    }],
    eveningTimeArray: [{
      time: {
        type: String
      },
      price: {
        type: String
      },
      available: {
        type: Boolean
      }
    }],
    nightTimeArray: [{
      time: {
        type: String
      },
      price: {
        type: String
      },
      available: {
        type: Boolean
      }
    }],
  },
  friday: {
    morningTimeArray: [{
      time: {
        type: String
      },
      price: {
        type: String
      },
      available: {
        type: Boolean
      }
    }],
    eveningTimeArray: [{
      time: {
        type: String
      },
      price: {
        type: String
      },
      available: {
        type: Boolean
      }
    }],
    nightTimeArray: [{
      time: {
        type: String
      },
      price: {
        type: String
      },
      available: {
        type: Boolean
      }
    }],
  },
  saturday: {
    morningTimeArray: [{
      time: {
        type: String
      },
      price: {
        type: String
      },
      available: {
        type: Boolean
      }
    }],
    eveningTimeArray: [{
      time: {
        type: String
      },
      price: {
        type: String
      },
      available: {
        type: Boolean
      }
    }],
    nightTimeArray: [{
      time: {
        type: String
      },
      price: {
        type: String
      },
      available: {
        type: Boolean
      }
    }],
  }
});


module.exports = {DaySchema};
