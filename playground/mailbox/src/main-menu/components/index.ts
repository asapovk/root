/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Tree } from '../../../../../packages/core/lib/NTree';
import { Tags } from '../../../../../packages/core/lib/Tags';
import { Search } from '../../../../__shared/ui/Svg/Search';
import { Settings } from '../../../../__shared/ui/Svg/Settings';
import { IState } from '../../_redux/types';
import { Reflexio } from '../../root-redux/reflector';
import { MainButton } from './MainButton';
import './styles.less';
//const vertialMenuItems  =  ['profile', 'contacts', 'setting' ]

const tree = new Tree({
  //@ts-ignore
  makeElement: (tag) => {
    if (tag === 'svg' || tag === 'path') {
      return document.createElementNS('http://www.w3.org/2000/svg', tag);
    } else {
      return document.createElement(tag);
    }
  },
});
const tags = new Tags(tree);
const reflexio = new Reflexio();
export const MainMenu = () => {
  const { state, trigger } = reflexio.useReflexio(
    (state: IState) => state,
    [],
    MainMenu
  );

  return tags.root({
    tagName: 'div',
    attributes: {
      class: 'main-menu-container',
    },
    child: [
      MainButton(tags),
      tags.div({
        className: 'horizontal-menu',
        child: [
          tags.div(
            {
              className: 'menu-item',
              child: Settings(tags, {}, 'main-hor-search-1'),
            },
            'main-hor-search-1-r'
          ),
          tags.div(
            {
              className: 'menu-item',
              child: Settings(tags, {}, 'main-hor-search-2'),
            },
            'main-hor-search-2-r'
          ),
          tags.div(
            {
              className: 'menu-item',
              child: Settings(tags, {}, 'main-hor-search-3'),
            },
            'main-hor-search-3-r'
          ),
        ],
      }),
      tags.div({
        className: 'vertical-menu',
        child: [
          tags.div(
            {
              className: 'menu-item',
              child: Search(tags, {}, 'main-ver-icon'),
            },
            'main-ver-div'
          ),
        ],
      }),
    ],
  });
};
