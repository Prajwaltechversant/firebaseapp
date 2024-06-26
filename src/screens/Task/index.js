import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import database from '@react-native-firebase/database';
import { TextInput } from 'react-native-paper';

export default function Task() {

  const [text, setText] = useState()
  const [data, setData] = useState()


  const fetchData = async () => {
    try {
      const snapshot = await database().ref('/user').once('value');
      if (snapshot.exists()) {
        const res = Object.keys(snapshot.val()).map(id => ({
          id: id,
          data: snapshot.val()[id].data
        }));
        setData(res);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
  
    fetchData(); 
  }, []);
  const add = async () => {
    await database().ref('/user').push().set(
      { data: text }
    )
    setText('')
    fetchData(); 

  }

  const delData = async(id)=>{
    await database().ref(`/user/${id}`).remove()
    fetchData(); 

  }

  const update = async(id)=>{
    await database().ref(`/user/${id}`).update({
      status:true
    })
  }
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        label="add"
        value={text}
        onChangeText={text => setText(text)}
      />
      <Text style={{ color: 'red', fontSize: 20 }}>Real time dB</Text>
      <TouchableOpacity style={{ backgroundColor: 'green', width: 100, height: 30, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white' }} onPress={add} >add</Text>

      </TouchableOpacity>

      <View style={{ backgroundColor:'yellow', width:'100%', justifyContent:'center', alignContent:'center', alignItems:'center' }}>
        <Text>
          <FlatList
            data={data}
            renderItem={({ item }) => <View><Text style={{ color: 'red' , fontSize:20, textAlign:'center',}}>{item.data}</Text>
            <Text style={{color:'red'}} onPress={()=>delData(item.id)}>DEL</Text>
            <Text style={{color:'red'}} onPress={()=>update(item.id)}>Update</Text>

            
            </View>
          }
            ListEmptyComponent={<Text>....</Text>}

          />
        </Text>
      </View>
    </View>
  );
}
