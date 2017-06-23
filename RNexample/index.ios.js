/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TabBarIOS,
} from 'react-native';
import Flex from './js/Flex'
import SimpleScrollView from './js/SimpleScrollView'
import SimpleListView from './js/SimpleListView'

export default class RNexample extends Component {
  statics = {
    title: '<TabBarIOS>',
    description: 'Tab-based navigation.',
  };

  displayName = 'TabBarExample';

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'featured',
      notifCount: 0,
      presses: 0,
    };
  }

  _renderContent (color, pageText, num) {
    switch (pageText) {
      case 'contacts':
        return (
          <SimpleScrollView/>
        );
      case 'history':
        return (
          <Flex/>
        );
      case 'featured':
        return (
          <SimpleListView/>
        );
    }
    // return (
    //   <View style={[styles.tabContent, {backgroundColor: color}]}>
    //     <Text style={styles.tabText}>{pageText}</Text>
    //     <Text style={styles.tabText}>{num} re-renders of the {pageText}</Text>
    //   </View>
    // );
  }

  render() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          systemIcon="contacts"
          selected={this.state.selectedTab === 'contacts'}
          onPress={() => {
            this.setState({
              selectedTab: 'contacts',
            });
          }}>
          {this._renderContent('#414A8C', 'contacts')}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon="history"
          badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
          selected={this.state.selectedTab === 'history'}
          onPress={() => {
            this.setState({
              selectedTab: 'history',
              notifCount: this.state.notifCount + 1,
            });
          }}>
          {this._renderContent('#783E33', 'history', this.state.notifCount)}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon="featured"
          renderAsOriginal
          title="More"
          selected={this.state.selectedTab === 'featured'}
          onPress={() => {
            this.setState({
              selectedTab: 'featured',
              presses: this.state.presses + 1
            });
          }}>
          {this._renderContent('#21551C', 'featured', this.state.presses)}
        </TabBarIOS.Item>
      </TabBarIOS>

    );
  }
}




AppRegistry.registerComponent('RNexample', () => RNexample);
