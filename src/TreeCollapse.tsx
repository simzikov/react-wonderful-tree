import React, { FC } from 'react';
import { Transition } from 'react-transition-group';
import { CollapseProps, CollapseState } from './types';

const TreeCollapse: FC<CollapseProps> = ({ height, isSmooth, isExpanded, children }) => {
  const duration = isSmooth ? 300 : 0;

  const defaultStyle = {
    maxHeight: 0,
    overflow: 'hidden',
  };

  const transitionStyles = {
    entering: {
      maxHeight: height,
      overflow: 'hidden',
      transition: `max-height ${duration}ms ease-out`,
    },
    entered: {
      maxHeight: height,
      overflow: 'visible',
    },
    exiting: {
      maxHeight: 0,
      overflow: 'hidden',
      transition: `max-height ${duration}ms ease-out`,
    },
    exited: {
      maxHeight: 0,
      overflow: 'hidden',
    },
  };

  return (
    <Transition in={isExpanded} timeout={duration} unmountOnExit>
      {(state: CollapseState) => <div style={{ ...defaultStyle, ...transitionStyles[state] }}>{children}</div>}
    </Transition>
  );
};

export default TreeCollapse;
