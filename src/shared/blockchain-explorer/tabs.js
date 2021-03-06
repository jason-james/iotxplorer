import React, { Component } from "react";
import {Tab} from './tab';

export class Tabs extends Component {

  render() {
    return (
      <div className='tabs is-fullwidth is-centered'>
        <ul>
          { this.props.tabList.map(tab =>
            <Tab tab={tab}
              key={tab.name}
              activeTab={this.props.activeTab}
              changeActiveTab={this.props.changeActiveTab}
            />
          )}
        </ul>
      </div>
    );
  }
}
