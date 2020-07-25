import React, { Component } from 'react';
import { highquality, topList } from '../../api/playLists.js'
import { formatCount } from "../../utils/format";
import { Pagination } from "antd";

class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // 选中的分类索引
            selectIndex: 0,
            // 歌单分类
            cats: [
                '全部',
                '欧美',
                '华语',
                '流行',
                '说唱',
                '摇滚',
                '民谣',
                '电子',
                '轻音乐',
                '影视原声',
                'ACG',
                '怀旧',
                '治愈',
                '旅行',
            ],
            // 顶部的标题
            topName: '',
            // 顶部的描述
            topDesc: '',
            // 顶部的封面
            topCover: '',
            // 总条数
            total: 0,
            // 页码
            page: 1,
            // 精品歌单列表
            topPlayLists: [],

        }
    }
    componentDidMount() {
        this.currentHighLists()
        this.currentTopList()
    }
    async currentHighLists() {
        const res = await highquality({
            cat: this.state.cats[this.state.selectIndex]
        })
        this.setState({
            topName: res.data.playlists[0].name,
            topCover: res.data.playlists[0].coverImgUrl,
            topDesc: res.data.playlists[0].description
        })
    }
    async currentTopList() {
        //(pageSize-1)*pageCount)
        const res = await topList({ cat: this.state.cats[this.state.selectIndex], offset: (this.state.page - 1) * 10 })
        this.setState({
            topPlayLists: res.data.playlists,
            total: res.data.total

        })
    }

    // 渲染头部
    renderTopCard = () => {
        const { topCover, topName, topDesc } = this.state
        return (
            <div className="top-card">
                <div className="icon-wrap">
                    <img src={topCover} alt="" />
                </div>
                <div className="content-wrap">
                    <div className="tag">精品歌单</div>
                    <div className="title">{topName}</div>
                    <div className="info">{topDesc}</div>
                </div>
                <img src={topCover} alt="" className="bg" />
                <div className="bg-mask"></div>
            </div>
        )

    }
    changeCat(index) {
        this.setState({
            selectIndex: index,
            page:1
        },()=>{
            this.currentHighLists()
        })


    }
    toPlayList(id){
        // console.log(id)
        this.props.history.push(`/playlist/${id}`)

    
    }
  
    // 渲染分类
    renderCategories() {
        const { selectIndex, cats } = this.state
        return (
            <div className="tab-bar">
                {
                    cats.map((item, index) => {
                        return <span key={index} className={selectIndex == index ? 'item active' : 'item'} onClick={() => this.changeCat(index)}>
                            {item} </span>
                    })
                }


            </div>
        )
    }
    // 渲染列表
    renderTopPlayList() {
        const {topPlayLists}=this.state
        return (
            <div className="tab-content">
                <div className="items">
                    {topPlayLists.map((item) => {
                        return (
                            <div
                                className="item"
                                key={item.id}
                                onClick={() => this.toPlayList(item.id)}
                            >
                                <div className="img-wrap">
                                    <div className="num-wrap">
                                        播放量:
                          <span className="num">{formatCount(item.playCount)}</span>
                                    </div>
                                    <img src={item.coverImgUrl} alt="" />
                                    <span className="iconfont icon-play"></span>
                                </div>
                                <p className="name">{item.description}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        )


    }
    onChange=(page, pageSize)=>{
   
    this.setState({
        page
    },()=>{
        this.currentTopList()
    })       
    
    }
    renderPagination() {
        const { page, total } = this.state
        return (
          <div style={{ textAlign: 'center',marginBottom:"80px" }}>
            <Pagination
              current={page}
              onChange={this.onChange}
              total={total}
              showSizeChanger={false}
            />
          </div>
        )

    }
    render() {
        return (
            <div className="playlists-container">
                {/* 渲染头部 */}
                {this.renderTopCard()}
                <div className="tab-container">
                    {/* 渲染分类 */}
                    {this.renderCategories()}
                    {/* 渲染列表 */}
                    {this.renderTopPlayList()}
                    {/* 渲染分页条 */}
                    {this.renderPagination()}
                </div>
            </div>
        );
    }
}

export default index;