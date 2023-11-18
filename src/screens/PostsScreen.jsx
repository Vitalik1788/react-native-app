import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import defaultImage from '../../assets/image/default.jpg';

import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { selectAvatar, selectEmail, selectLogin, selectUserId } from '../redux/auth/authSelectors';
import { getUserPosts } from '../redux/posts/postsOperation';
import { selectPosts } from '../redux/posts/postsSelectors';
import { getComments } from '../redux/posts/commentsOperation';


const PostsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const avatar = useSelector(selectAvatar);
  const userId = useSelector(selectUserId);
  const login = useSelector(selectLogin);
  const email = useSelector(selectEmail);
  const posts = useSelector(selectPosts);
    
  useEffect(() => {
    dispatch(getUserPosts());
    dispatch(getComments());
  }, [dispatch]);  

  


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userContainer}>
        <Image
          source={avatar ? { uri: avatar } : defaultImage}
          style={styles.userPhoto}
        />
        <View style={styles.textContainer}>
          <Text style={styles.nameTextStyle}>{login}</Text>
          <Text>{email}</Text>
        </View>
      </View>
      <FlatList
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', fontSize: 16 }}>
            Наразі немає жодної публіції:( Створіть першу:)
          </Text>
        }
        showsVerticalScrollIndicator={false}
        data={posts ? posts.filter(post => post.userId === userId) : {}}
        renderItem={({ item }) => (
          <View style={styles.cardBox}>
            <Image
              style={styles.postImageStyle}
              source={item && { uri: item.postImage }}
            />
            <Text style={styles.imageTitle}>{item.placeName}</Text>
            <View style={styles.statsContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Comments', {
                    photo: item.postImage,
                    cardId: item.uniqueCardId,
                  })
                }
              >
                <View style={[styles.postStats, { marginRight: 24 }]}>
                  <Feather
                    style={{ marginRight: 9 }}
                    name="message-circle"
                    size={24}
                    color="#FF6C00"
                  />
                  <Text>{item.comments}</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.postStats}>
                <Feather
                  style={{ marginRight: 9 }}
                  name="thumbs-up"
                  size={24}
                  color="#FF6C00"
                />
                <Text>{item.likes}</Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('Map')}
                style={{ marginLeft: 'auto' }}
              >
                <View style={styles.postStats}>
                  <Feather
                    style={{ marginRight: 4 }}
                    name="map-pin"
                    size={24}
                    color="#BDBDBD"
                  />
                  <Text style={styles.locationText}>
                    {item.location
                      ? item.location
                      : [item.region, item.country].join(', ')}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },

  userContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 32,
  },

  userPhoto: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },

  textContainer: {
    marginLeft: 8,
  },

  nameTextStyle: {
    fontFamily: 'RobotoBold',
    fontSize: 13,
    color: '#212121',
  },

  emailTextStyle: {
    fontFamily: 'RobotoRegular',
    fontSize: 11,
    color: 'rgba(33, 33, 33, 0.8)',
  },

  cardBox: {
    marginBottom: 32,
  },

  postImageStyle: {
    width: '100%',
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },

  imageTitle: {
    fontFamily: 'RobotoMedium',
    fontSize: 16,
    marginBottom: 8,
  },

  statsContainer: {
    display: 'flex',
    flexDirection: 'row',
  },

  postStats: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  locationText: {
    fontFamily: 'RobotoRegular',
    fontSize: 16,
    color: '#212121',
    textDecorationLine: 'underline',
  },
});

export default PostsScreen;
