import React, { Component } from 'react';
import { getBannerList, getRecommendlist, getNewsong, getMv } from '../../api/discovery'
import Slider from "react-slick";
import bus from '../../utils/bus'
class index extends Component {
    constructor() {
        super()
        this.state = {
            bannerList: [],
            recommendList: [],
            newsong: [],
            mv: []

        }
    }
    async currentBannerList() {
        const res = await getBannerList()

        this.setState({
            bannerList: res.data.banners
        })
    }
    // 初始化推荐列表的接口
    currentRecommedList = async () => {
        const res = await getRecommendlist()
        this.setState({
            recommendList: res.data.result
        })
    }
    currentSongList = async () => {
        const res = await getNewsong()
        this.setState({
            newsong: res.data.result
        })
    }
    currentMvList = async () => {
        const res = await getMv()
        this.setState({
            mv: res.data.result
        })

    }
    componentDidMount() {
        this.currentBannerList()
        this.currentRecommedList()
        this.currentSongList()
        this.currentMvList()
    }

    // 轮播图显示
    currentBannerView = () => {
        const settings = {
            // dots: true,
            infinite: true,
            // centerMode: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        const { bannerList } = this.state
        return (<div>
            <Slider {...settings}>
                {
                    bannerList.map((item, id) => {
                        return (
                            <div key={item.targetId}>
                                <img src={item.imageUrl} alt="" />

                            </div>
                        )
                    })
                }


            </Slider>



        </div>)
    }
    renderRecommend = () => {
        const { recommendList } = this.state
        return (
            <div className="recommend">
                <h3 className="title">推荐歌单</h3>
                <div className="items">
                    {recommendList.map((item) => {
                        return (
                            <div key={item.id} className="item">
                                <div
                                    className="img-wrap"
                                    onClick={() => this.toPlayList(item.id)}
                                >
                                    <div className="desc-wrap">
                                        <span className="desc">{item.copywriter}</span>
                                    </div>
                                    <img src={item.picUrl} alt="" />
                                    <span className="iconfont icon-play"></span>
                                </div>
                                <p className="name">{item.name}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
    // 渲染最新音乐
    renderNewSong = () => {
        const { newsong } = this.state
        return (
            <div className="news">
                <h3 className="title">最新音乐</h3>
                <div className="items">
                    {newsong.map((item) => {
                        return (
                            <div className="item" key={item.id}>
                                <div className="img-wrap">
                                    <img src={item.picUrl} alt="" />
                                    <span
                                        onClick={() => this.playMusic(item.id)}
                                        className="iconfont icon-play"
                                    ></span>
                                </div>
                                <div className="song-wrap">
                                    <div className="song-name">{item.name}</div>
                                    <div className="singer">{item.song.artists[0].name}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
    renderMv = () => {
        const { mv } = this.state
        return (
            <div className="mvs">
                <h3 className="title">推荐MV</h3>
                <div className="items">
                    {mv.map((item) => {
                        return (
                            <div className="item" key={item.id}>
                                <div className="img-wrap" onClick={() => this.toMv(item.id)}>
                                    <img src={item.picUrl} alt="" />
                                    <span className="iconfont icon-play"></span>
                                    <div className="num-wrap">
                                        <div className="iconfont icon-play"></div>
                                        <div className="num">{item.playCount}</div>
                                    </div>
                                </div>
                                <div className="info-wrap">
                                    <div className="name">{item.copywriter}</div>
                                    <div className="singer">{item.artistName}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )

    }

    // 去播放音乐
    playMusic = (id) => {
        bus.emit('playId', id)

    }
    // 到歌单列表
    toPlayList=(id)=>{
        this.props.history.push(`/playlist/${id}`)
    }

    // 到mv 的列表
    toMv=(id)=>{
        this.props.history.push(`/mv/${id}`)

    }

    render() {
        return (
            <div className="discovery-container">
                {this.currentBannerView()}
                {/* 渲染推荐歌单 */}
                {this.renderRecommend()}
                {/* 渲染最新音乐 */}
                {this.renderNewSong()}
                {/* 渲染推荐MV */}
                {this.renderMv()}

            </div>
        );
    }
}

export default index;