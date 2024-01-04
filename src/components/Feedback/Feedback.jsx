import { Component } from 'react';
import FeedbackOptions from './FeedbackOptions';
import Statistics from './Statistics';
import Section from './Section';
import Notification from './Notification';

import styles from './feedback.module.css';

class Feedback extends Component {
  static feedbackOptions = ['good', 'neutral', 'bad'];

  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  countTotalFeedback() {
    const { good, neutral, bad } = this.state;
    const total = good + neutral + bad;
    return total;
  }

  countPositiveFeedbackPercentage(good) {
    const total = this.countTotalFeedback();
    if (!total) {
      return 0;
    }
    const value = this.state[good];
    return Number(((value / total) * 100).toFixed(2));
  }

  leaveFeedback = keyName => {
    this.setState(prevState => {
      return {
        [keyName]: prevState[keyName] + 1,
      };
    });
  };

  render() {
    const { good, neutral, bad } = this.state;

    const total = this.countTotalFeedback();

    const positivePersentage = this.countPositiveFeedbackPercentage('good');

    return (
      <div className={styles.wrapper}>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={Feedback.feedbackOptions}
            leaveFeedback={this.leaveFeedback}
          />
        </Section>
        <Section title="Statistics">
          {total === 0 ? (
            <Notification message="There is no feedback" />
          ) : (
            <Statistics
              total={total}
              good={good}
              neutral={neutral}
              bad={bad}
              positivePersentage={positivePersentage}
            />
          )}
        </Section>
      </div>
    );
  }
}

export default Feedback;
