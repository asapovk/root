import { Icon } from '../Icon';
import { Tree } from '../../../../packages/core/lib/NTree';
import { Tags } from '../../../../packages/core/lib/Tags';

/* eslint-disable max-len */
export const Arrow = (tree: Tree | Tags, props, key) => {
  const arrowElement = tree.tag(
    {
      tagName: 'path',
      attributes: {
        d: 'M6.323 24.323l.354.354a.5.5 0 0 0 .707 0l11.823-11.823a.5.5 0 0 0 0-.708L7.384.323a.5.5 0 0 0-.707 0l-.354.354a.5.5 0 0 0 0 .707L17.44 12.5 6.323 23.616a.5.5 0 0 0 0 .707z',
      },
      child: null,
    },
    `${key}_arr`
  );

  return Icon(
    tree,
    {
      ...props,
      width: '25',
      height: '25',
      viewBox: '0 0 25 25',
      child: arrowElement,
    },
    key
  );
};

// <Icon {...props} width='25' height='25' viewBox='0 0 25 25'>
//   <path d='M6.323 24.323l.354.354a.5.5 0 0 0 .707 0l11.823-11.823a.5.5 0 0 0 0-.708L7.384.323a.5.5 0 0 0-.707 0l-.354.354a.5.5 0 0 0 0 .707L17.44 12.5 6.323 23.616a.5.5 0 0 0 0 .707z' />
// </Icon>

/* eslint-enable max-len */
