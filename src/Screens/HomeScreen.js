import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  Linking,
} from "react-native";
import axios from "axios";
import MyHeader from "../components/MyHeader";
import { Icon, Card, Button } from "react-native-elements";
import { PacmanIndicator } from "react-native-indicators";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articlesData: {},
      imageUrl: "",
      loading: true,
      likeIcon: "like2",
      dislikeIcon: "dislike2",
      likeButtonDisabled: false,
      dislikeButtonDisabled: false,
      popularArticles: [],
    };
  }

  getArticles = async () => {
    await axios
      .get(
        "https://5822-2405-201-a00a-a0b6-f1db-f744-7566-771a.ngrok.io/get-article"
      )
      .then((response) => {
        details = response.data.data;
        this.setState({
          articlesData: details,
          likeButtonDisabled: false,
          dislikeButtonDisabled: false,
          likeIcon: "like2",
          dislikeIcon: "dislike2",
        });
      })
      .then(() => {
        this.ScrapeImageUrlFromWebsite(this.state.articlesData.url);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  likedArticles = async () => {
    // used this code from thunder client in vscode
    let headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    };

    let reqOptions = {
      url: "https://5822-2405-201-a00a-a0b6-f1db-f744-7566-771a.ngrok.io/liked-article",
      method: "POST",
      headers: headersList,
    };

    await axios
      .request(reqOptions)
      .then(() => {
        this.getArticles();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  dislikedArticles = async () => {
    // used this code from thunder client in vscode
    let headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    };

    let reqOptions = {
      url: "https://5822-2405-201-a00a-a0b6-f1db-f744-7566-771a.ngrok.io/unliked-article",
      method: "POST",
      headers: headersList,
    };

    await axios
      .request(reqOptions)
      .then(() => {
        this.getArticles();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  // !! Mam i have made my own flask api which will take the website's url, scrape it and get all the image urls from the website and provide the links of the urls
  ScrapeImageUrlFromWebsite = async (url) => {
    var req = await fetch(
      `https://ba00-2405-201-a00a-a0b6-f1db-f744-7566-771a.ngrok.io/data?url=${url}`
    );
    var res = await req.json();
    this.setState({ imageUrl: res.img_url, loading: false });
  };

  getPopularArticles = async () => {
    var req = await fetch(
      "https://5822-2405-201-a00a-a0b6-f1db-f744-7566-771a.ngrok.io/popular-articles"
    );
    var res = await req.json();
    this.setState({ popularArticles: res.data });
  };

  componentDidMount() {
    this.getArticles();
    this.getPopularArticles();
  }

  render() {
    return this.state.loading ? (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <MyHeader title="Articles Recommender" />
        <View
          style={{
            width: "100%",
            height: "90%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PacmanIndicator size={100} color="#1f89dc" />
        </View>
      </View>
    ) : (
      <View style={styles.container}>
        <MyHeader title="Articles Recommender" />
        {/* Popular Articles */}
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 21,
            paddingTop: 5,
            textAlign: "center",
            marginTop: 4,
          }}
        >
          Popular Articles
        </Text>
        <FlatList
          horizontal={true}
          data={this.state.popularArticles}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Card containerStyle={{ width: 360 }}>
              <Card.Title style={{ fontSize: 18 }}>{item.title}</Card.Title>
              <Card.Divider />

              <Text style={{ marginBottom: 10 }} numberOfLines={2}>
                {item.text}
              </Text>
              <Button
                onPress={() => Linking.openURL(item.url)}
                icon={
                  <Icon
                    name="eye"
                    color="#ffffff"
                    type="antdesign"
                    iconStyle={{ marginRight: 10 }}
                  />
                }
                buttonStyle={{
                  marginTop: 20,
                }}
                title="Read Article"
              />
            </Card>
          )}
        />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 21,
            padding: 10,
            textAlign: "center",
            // marginTop: "58%",
          }}
        >
          Recommended Articles
        </Text>
        <View
          style={{
            alignSelf: "center",
            width: "90%",
            height: "47%",
            backgroundColor: "#fff",
            borderRadius: 10,
            borderColor: "#000",
            borderWidth: 2,
            marginBottom: "3%",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 18,
              padding: 10,
              textAlign: "left",
              marginLeft: 20,
            }}
          >
            {this.state.articlesData.title}
          </Text>

          <Image
            source={{ uri: this.state.imageUrl }}
            style={{
              width: "80%",
              height: "40%",
              borderRadius: 20,
              alignSelf: "center",
            }}
          />
          <Text
            numberOfLines={4}
            style={{ textAlign: "justify", fontSize: 15, padding: 10 }}
          >
            {this.state.articlesData.text}
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Icon
              name={this.state.likeIcon}
              color="#00aced"
              type="antdesign"
              size={40}
              onPress={() => {
                this.likedArticles();
                this.setState({
                  likeIcon: "like1",
                  dislikeButtonDisabled: true,
                });
              }}
              disabled={this.state.likeButtonDisabled}
            />
            <Icon
              name={this.state.dislikeIcon}
              color="#00aced"
              type="antdesign"
              size={40}
              onPress={() => {
                this.dislikedArticles();
                this.setState({
                  dislikeIcon: "dislike1",
                  likeButtonDisabled: true,
                });
              }}
              disabled={this.state.dislikeButtonDisabled}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default HomeScreen;

// Made with 💖 by SSK(Swayam sai kar)
