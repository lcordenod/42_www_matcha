const tagModel = require("../models/tagModel");
const moment = require("moment");

module.exports = {
  getRadiusDistanceCoord: (latitude, longitude, rayon) => {
    var offSetLat = rayon / 111.11;
    var OneLongitudeDegree = 111.11 * Math.cos((latitude * Math.PI) / 180);
    var offSetLong = rayon / OneLongitudeDegree;
    var MaxLatitude = latitude + offSetLat;
    var MinLatitude = latitude - offSetLat;
    var MaxLongitude = longitude + offSetLong;
    var MinLongitude = longitude - offSetLong;
    return [MinLatitude, MaxLatitude, MinLongitude, MaxLongitude];
  },

  getMutualTags: async (user_id, target_id) => {
    var user_tags = await tagModel.getAllUserTags(user_id);
    var target_tags = await tagModel.getAllUserTags(target_id);
    var tags = 0;

    for (var i = 0; i < user_tags.length; i++) {
      for (var k = 0; k < target_tags.length; k++) {
        if (user_tags[i].tag_id == target_tags[k].tag_id) tags++;
      }
    }
    var count = 0;
    switch (tags) {
      case 0:
        break;
      case 1:
        count += 3;
        break;
      case 2:
        count += 5;
        break;
      case 3:
        count += 9;
        break;
      case 4:
        count += 12;
        break;
      case 5:
        count += 15;
        break;
      default:
        count += 20;
    }
    return count;
  },

  getDistanceScore: (lat1, long1, lat2, long2) => {
    var latitude1 = (lat1 * Math.PI) / 180;
    var latitude2 = (lat2 * Math.PI) / 180;
    var longitude1 = (long1 * Math.PI) / 180;
    var longitude2 = (long2 * Math.PI) / 180;
    var R = 6371;

    var d =
      R *
      Math.acos(
        Math.cos(latitude1) *
          Math.cos(latitude2) *
          Math.cos(longitude2 - longitude1) +
          Math.sin(latitude1) * Math.sin(latitude2)
      );

    return d;
  },

  getScoredList: async (listData, user) => {
    var score = listData.copyWithin(0);

    for (var i = 0; i < listData.length; i++) {
      var count = 0;
      count +=
        listData[i].sexual_orientation == user.sexual_orientation ? 40 : 25;
      score[i].geo_lat = await module.exports.getDistanceScore(
        user.geo_lat,
        user.geo_long,
        listData[i].geo_lat,
        listData[i].geo_long
      );
      if (score[i].geo_lat < 10) count += 25;
      else if (score[i].geo_lat < 25) count += 20;
      else if (score[i].geo_lat < 50) count += 15;
      else if (score[i].geo_lat < 100) count += 10;
      else if (score[i].geo_lat < 250) count += 5;
      count += await module.exports.getMutualTags(user.id, listData[i].id);
      if (
        listData[i].pop_score >= user.pop_score - 50 &&
        listData[i].pop_score <= user.pop_score + 50
      )
        count += 15;
      else if (
        listData[i].pop_score >= user.pop_score - 100 &&
        listData[i].pop_score <= user.pop_score + 100
      )
        count += 10;
      else if (
        listData[i].pop_score >= user.pop_score - 250 &&
        listData[i].pop_score <= user.pop_score + 250
      )
        count += 5;
      score[i].pop_max = count;
      score[i].birthdate = moment().diff(listData[i].birthdate, "years", false);
      var tags = [];
      var result = await tagModel.getAllUserTags(listData[i].id);
      result.forEach(element => {
        tags.push(element.tag_id);
      });
      //await tags.push(result);
      score[i].tags = tags;
    }
    score.sort((a, b) => {
      return b.pop_max - a.pop_max;
    });
    return score;
  },

  ageToBirthdate: age => {
    var year = moment().format("YYYY");
    var tmp = moment().set("year", year - age);
    var newAge = moment(tmp).format("YYYY");

    return newAge;
  },

  sortWithTags: (dataList, tagsList) => {
    var sortedList = [];
    for (var i = 0; i < dataList.length; i++) {
      var count = 0;
      for (var k = 0; k < dataList[i].tags.length; k++) {
        if (tagsList.includes(dataList[i].tags[k])) count++;
      }
      if (count == tagsList.length) sortedList.push(dataList[i]);
    }
    return sortedList;
  }
};
