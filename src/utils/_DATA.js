
let users = {
  newyork: {
    id: 'newyork',
    name: 'New Yorker',
    avatarURL: '/images/avatars/newyork.png',
    answers: {
      'Q1': 'optionOne',
      'Q2': 'optionTwo',
      Q3: 'optionTwo',
      Q4: 'optionTwo'
    },
    questions: ['Q1', 'Q3']
  },
  london: {
    id: 'london',
    name: 'Londoner',
    avatarURL: '/images/avatars/london.png',
    answers: {
      Q5: 'optionOne',
      Q6: 'optionTwo'
    },
    questions: ['Q4', 'Q5']
  },
  paris: {
    id: 'paris',
    name: 'Parisian',
    avatarURL: '/images/avatars/paris.png',
    answers: {
      Q6: 'optionOne',
      Q5: 'optionTwo',
      'Q2': 'optionTwo'
    },
    questions: ['Q2', 'Q6']
  }
};

let questions = {
  'Q1': {
    id: 'Q1',
    author: 'newyork',
    timestamp: 1467166872634,
    optionOne: {
      votes: ['newyork'],
      text: 'be able to talk to animals'
    },
    optionTwo: {
      votes: [],
      text: 'speak all foreign languages'
    }
  },
  'Q2': {
    id: 'Q2',
    author: 'paris',
    timestamp: 1468479767190,
    optionOne: {
      votes: [],
      text: 'win the lottery'
    },
    optionTwo: {
      votes: ['paris', 'newyork'],
      text: 'live twice as long'
    }
  },
  'Q3': {
    id: 'Q3',
    author: 'newyork',
    timestamp: 1488579767190,
    optionOne: {
      votes: [],
      text: 'go deep sea diving'
    },
    optionTwo: {
      votes: ['newyork'],
      text: 'go bungee jumping'
    }
  },
  Q4: {
    id: 'Q4',
    author: 'london',
    timestamp: 1482579767190,
    optionOne: {
      votes: [],
      text: 'be given a lifetime supply of delicious food'
    },
    optionTwo: {
      votes: ['newyork'],
      text: 'be given a lifetime supply of interesting books'
    }
  },
  Q5: {
    id: 'Q5',
    author: 'london',
    timestamp: 1489579767190,
    optionOne: {
      votes: ['london'],
      text: 'be able to breath underwater'
    },
    optionTwo: {
      votes: ['paris'],
      text: 'be able to fly through the air'
    }
  },
  Q6: {
    id: 'Q6',
    author: 'paris',
    timestamp: 1493579767190,
    optionOne: {
      votes: ['paris'],
      text: 'be an unknown football player'
    },
    optionTwo: {
      votes: ['london'],
      text: 'be a famous badminton star'
    }
  }
};

function generateUID() {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
}

export function _getUsers() {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...users }), 1000);
  });
}

export function _getQuestions() {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...questions }), 1000);
  });
}

function formatQuestion({ optionOneText, optionTwoText, author }) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    optionOne: {
      votes: [],
      text: optionOneText
    },
    optionTwo: {
      votes: [],
      text: optionTwoText
    }
  };
}

export function _saveQuestion(question) {
  return new Promise((res, rej) => {
    const authUser = question.author;
    const formattedQuestion = formatQuestion(question);

    setTimeout(() => {
      questions = {
        ...questions,
        [formattedQuestion.id]: formattedQuestion
      };

      users = {
        ...users,
        [authUser]: {
          ...users[authUser],
          questions: users[authUser].questions.concat([formattedQuestion.id])
        }
      };

      res(formattedQuestion);
    }, 1000);
  });
}

export function _saveQuestionAnswer({ authUser, qid, answer }) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      users = {
        ...users,
        [authUser]: {
          ...users[authUser],
          answers: {
            ...users[authUser].answers,
            [qid]: answer
          }
        }
      };

      questions = {
        ...questions,
        [qid]: {
          ...questions[qid],
          [answer]: {
            ...questions[qid][answer],
            votes: questions[qid][answer].votes.concat([authUser])
          }
        }
      };

      res();
    }, 500);
  });
}
