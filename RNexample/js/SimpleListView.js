/**
 * Created by exialym on 2017/6/13.
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  ActivityIndicator,
  ListView
} from 'react-native';

// Row comparison function
const rowHasChanged = (r1, r2) => r1.title !== r2.title

// DataSource template object
const ds = new ListView.DataSource({rowHasChanged})

export default class SimpleListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finish:false,
    }
  }
  componentDidMount(){
    this.getMoviesFromApiAsync();
  }
  getMoviesFromApiAsync() {
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          finish:true,
          data:ds.cloneWithRows(responseJson.movies)
        });
        return responseJson.movies;
      })
      .catch((error) => {
        this.setState({
          finish:false
        });
        //console.error(error);
      });
  }
  renderRow = (rowData) => {
    //console.log(this.state)
    return (
      <Text style={styles.row}>
        {rowData.title}
      </Text>
    )
  }
  render(){
    if (this.state.finish) {
      return (
        <View style={styles.container}>
          <ListView
            style={styles.container}
            dataSource={this.state.data}
            renderRow={this.renderRow.bind(this)}
          />
        </View>
      )
    } else {
      return (
        <View style={[styles.container,styles.loadingContainer]}>
          <ActivityIndicator
            animating={!this.state.finish}
            style={[styles.centering, {height: 80}]}
            size="large"
          />
          <Text style={styles.text}>Loading...</Text>
        </View>
      )
    }

  }
}
const styles = StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  test: {
    textAlign:'center',
  },
  container: {
    flex: 1,
  },
  loadingContainer:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: '#2fa2ff',
    color:'white',
  },

});
