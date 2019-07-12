import React from 'react'
import { TouchableOpacity, View, FlatList, Text, ActivityIndicator } from 'react-native'

export default class Home extends React.PureComponent {
    static navigationOptions = {
        title: 'Charts List'
    }
    
    state = {
        isLoading: true,
        data: []
    }
    
    async componentDidMount() {
        const response = await fetch('https://charts-pesadao.herokuapp.com/')
        const responseJson = await response.json()
        
        this.setState({
            isLoading: false,
            data: responseJson.charts
        })
        
    }

    _renderItem = ({item}) => {
        return  (
            <TouchableOpacity onPress={()=>this._onItemPress(item)} style={{flexDirection:'row', padding: 10, alignItems:'center'}}>
                <Text style={{marginLeft: 10}}>Chart - {item.id}</Text>
            </TouchableOpacity>
        )
    }

    _onItemPress = (item) => {
        this.props.navigation.navigate('Details', {chart: item})
    } 

    render() {
        if (this.state.isLoading) {
            return (
              <View style={style.container}>
                <ActivityIndicator />
              </View>
            )
          } else {
            return (
                <FlatList 
                    data={this.state.data}
                    renderItem={this._renderItem}
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={()=>
                        <View style={{height:1, backgroundColor: '#f7f7f7'}} 
                    />}
                />
            )
        }
    }
}
