import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { useRoute } from '@react-navigation/native';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectComments } from '../redux/posts/postsSelectors';
import { selectAvatar, selectUserId } from '../redux/auth/authSelectors';
import { addComment, getComments } from '../redux/posts/commentsOperation';

const CommentsScreen = () => {
  const [text, setText] = useState(null);
  const { params: { photo } } = useRoute();
  const comments = useSelector(selectComments);
  const avatar = useSelector(selectAvatar);
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComments());
  }, [dispatch]);

  const handleSubmit = () => {
    if (!text) {
      alert("Коментар до фото відсутній")
      return
    }

    const comment = {
      text,
      avatar,
      userId,
    }
    dispatch(addComment(comment));
    setText("");
  }
  
  return (
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.postImageStyle} />
      <FlatList
        
        ListEmptyComponent={<Text>Немає жодного коментаря</Text>}
        showsVerticalScrollIndicator={false}
        data={comments}
        renderItem={({ item }) => (
          <View style={styles.postBox}>
            <Image
              style={styles.commentUserImage}
              source={{ uri: item.avatar }}
            />
            <View style={styles.commentTextBox}>
              <Text style={styles.commentText}>{item.text}</Text>
            </View>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Коментувати..."
          style={styles.inputStyle}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.sendButton}>
          <AntDesign name="arrowup" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  postImageStyle: {
    marginVertical: 32,
    width: '100%',
    height: 240,
    borderRadius: 8,
  },

  postBox: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 24,
  },

  commentUserImage: {
    width: 48,
    height: 48,
    borderRadius: 50,    
  },

  commentTextBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginLeft: 16,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,

  },

  commentText: {
    fontFamily: 'RobotoRegular',
    fontSize: 13,
  },

  inputContainer: {
    position: "relative",
    marginTop: 'auto',
    paddingBottom: 16,
  },

  inputStyle: {
    fontSize: 16,
    fontWeight: '500',
    paddingLeft: 16,
    paddingVertical: 16,
    backgroundColor: 'rgba(246, 246, 246, 1)',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(232, 232, 232, 1)',
  },

  sendButton: {
    position: "absolute",
    top: 10,
    left: 340,
    justifyContent: "center",
    alignItems: "center",
    width: 34,
    height: 34,
    borderRadius: 50,
    backgroundColor: '#FF6C00',
  },
});

export default CommentsScreen;
