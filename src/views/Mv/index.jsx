import React, { Component } from 'react';
import { mvUrl, mvDetail, simiMV } from "../../api/mv";
import { formatCount,formatDuration } from "../../utils/format";

class index extends Component {
    constructor() {
        super()
        this.state = {
            // mv地址
            mvUrl: '',
            // 相似MV列表
            simiMV: [],
            // 热门评论
            hotComments: [],
            // 最新评论
            newComments: [],
            // 分页相关数据
            // 页码
            page: 1,
            // 每页显示条数
            limit: 5,
            // 总条数
            total: 0,
            // mv的名字
            mvName: '',
            // 播放次数
            playCount: '',
            // 发布时间
            publishTime: '',
            // 描述
            desc: '',
            // 歌手名
            artistName: '',
            // 封面
            artistCover: '',
        }
    }
    componentDidMount() {
        const id = this.props.match.params.id
        this.getMvUrl(id)
        this.getMvDetail(id)
        this.getSimiMV(id)
        // console.log(this.props.match.params.id)
    }
    // 获取MV 地址
    async getMvUrl(id) {
        const res = await mvUrl({ id: id })
        if (res.data.code === 200) {
            this.setState({
                mvUrl: res.data.data.url
            })

        }

    }
    async getMvDetail(id) {
        const res = await mvDetail({ mvid: id })
        console.log(res)
        this.setState({
            artistCover: res.data.data.cover,
            artistName: res.data.data.artistName,
            mvName: res.data.data.name,
            publishTime: res.data.data.publishTime,
            playCount: res.data.data.playCount,
            desc: res.data.data.desc
        })
    }
    async getSimiMV(id) {
        const res = await simiMV({ mvid: id })
        console.log(res)

    }
    // 渲染评价信息
    renderComments() {
        const { simiMV } = this.state
        return <div>
            <h3 className="title">相关推荐</h3>
            <div className="mvs">
                {simiMV.map((item) => {
                    return (
                        <div className="items" key={item.id}>
                            <div className="item" onClick={() => this.toMV(item.id)}>
                                <div className="img-wrap">
                                    <img src={item.cover} alt="" />
                                    <span className="iconfont icon-play"></span>
                                    <div className="num-wrap">
                                        <div className="iconfont icon-play"></div>
                                        <div className="num">{formatCount(item.playCount)}</div>
                                    </div>
                                    <span className="time">
                                        {formatDuration(item.duration)}
                                    </span>
                                </div>
                                <div className="info-wrap">
                                    <div className="name">{item.name}</div>
                                    <div className="singer">{item.artistName}</div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>

    }
    // 渲染MV视频播放器
    renderMvVideo() {
        return <div>
            <h3 className="title">mv详情</h3>
            <div className="video-wrap">
                <video autoPlay controls url={this.state.mvUrl}></video>
            </div>
        </div>

    }
    // 渲染MV详情信息
    renderMvInfo() {
        const { artistCover, artistName, mvName, publishTime, playCount, desc } = this.state

        return <div className="info-wrap">
            <div className="singer-info">
                <div className="avatar-wrap">
                    <img src={artistCover} alt="" />
                </div>
                <span className="name">{artistName}</span>
            </div>
            <div className="mv-info">
                <h2 className="title">{mvName}</h2>
                <span className="date">发布：{publishTime}</span>
                <span className="number">播放：{formatCount(playCount)}次</span>
                <p className="desc">{desc}</p>
            </div>
        </div>

    }

    // 渲染相关推荐
    renderMvRecommend() {

    }
    render() {
        return (
            <div className="mv-container">
                <div className="mv-wrap">
                    {/* 渲染MV视频播放器 */}
                    {this.renderMvVideo()}
                    {/* 渲染MV详情信息 */}
                    {this.renderMvInfo()}
                    {/* 渲染评价信息 */}
                    {this.renderComments()}
                </div>
                <div className="mv-recommend">
                    {/* 渲染相关推荐 */}
                    {this.renderMvRecommend()}
                </div>
            </div>
        );
    }
}

export default index;