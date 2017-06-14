/**
 * Created by griga on 11/24/15.
 */

import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';

import NavMenu from './NavMenu'

import MinifyMenu from './MinifyMenu'

import LoginInfo from '../../user/components/LoginInfo'
import AsideChat from '../../chat/components/AsideChat'

import * as LayoutActions from '../../layout/LayoutActions'

class Navigation extends React.Component {
  render() {
    const {lang} = this.props;
    // console.log(lang);    
    return (
      <aside id="left-panel">
        <LoginInfo />
        <nav>
          <NavMenu
            lang={lang}
            openedSign={'<i class="fa fa-minus-square-o"></i>'}
            closedSign={'<i class="fa fa-plus-square-o"></i>'}
          />
        </nav>
        <MinifyMenu />
      </aside>
    )
  }
}


const mapStateToProps = (state, ownProps) => (state.layout); 

function mapDispatchToProps(dispatch) {
  return bindActionCreators(LayoutActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);