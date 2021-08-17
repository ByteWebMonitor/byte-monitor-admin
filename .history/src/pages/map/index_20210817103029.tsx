import React, { useEffect, useState } from 'react';

import { Scene } from '@antv/l7';
import { CountryLayer } from '@antv/l7-district';
import { Mapbox } from '@antv/l7-maps';

import './index.less'

/** 地图配置 */

// value字段及字段名是可以自定义的

const ProvinceData = [
  {
    name: '云南省',
    code: 530000,
    value: 0,
  },
  {
    name: '黑龙江省',
    code: 230000,
    value: 0,
  },
  {
    name: '贵州省',
    code: 520000,
    value: 0,
  },
  {
    name: '北京市',
    code: 110000,
    value: 0,
  },
  {
    name: '河北省',
    code: 130000,
    value: 0,
  },
  {
    name: '山西省',
    code: 140000,
    value: 0,
  },
  {
    name: '吉林省',
    code: 220000,
    value: 0,
  },
  {
    name: '宁夏回族自治区',
    code: 640000,
    value: 0,
  },
  {
    name: '辽宁省',
    code: 210000,
    value: 0,
  },
  {
    name: '海南省',
    code: 460000,
    value: 0,
  },
  {
    name: '内蒙古自治区',
    code: 150000,
    value: 0,
  },
  {
    name: '天津市',
    code: 120000,
    value: 0,
  },
  {
    name: '新疆维吾尔自治区',
    code: 650000,
    value: 0,
  },
  {
    name: '上海市',
    code: 310000,
    value: 0,
  },
  {
    name: '陕西省',
    code: 610000,
    value: 0,
  },
  {
    name: '甘肃省',
    code: 620000,
    value: 0,
  },
  {
    name: '安徽省',
    code: 340000,
    value: 0,
  },
  {
    name: '香港特别行政区',
    code: 810000,
    value: 0,
  },
  {
    name: '广东省',
    code: 440000,
    value: 0,
  },
  {
    name: '河南省',
    code: 410000,
    value: 0,
  },
  {
    name: '湖南省',
    code: 430000,
    value: 0,
  },
  {
    name: '江西省',
    code: 360000,
    value: 0,
  },
  {
    name: '四川省',
    code: 510000,
    value: 0,
  },
  {
    name: '广西壮族自治区',
    code: 450000,
    value: 0,
  },
  {
    name: '江苏省',
    code: 320000,
    value: 0,
  },
  {
    name: '澳门特别行政区',
    code: 820000,
    value: 0,
  },
  {
    name: '浙江省',
    code: 330000,
    value: 0,
  },
  {
    name: '山东省',
    code: 370000,
    value: 0,
  },
  {
    name: '青海省',
    code: 630000,
    value: 0,
  },
  {
    name: '重庆市',
    code: 500000,
    value: 0,
  },
  {
    name: '福建省',
    code: 350000,
    value: 0,
  },
  {
    name: '湖北省',
    code: 420000,
    value: 0,
  },
  {
    name: '西藏自治区',
    code: 540000,
    value: 0,
  },
  {
    name: '台湾省',
    code: 710000,
    value: 100,
  },
];

const Map: React.FC = () => {
 const draw = () => {
 	/** scene这个实例一定要在dom渲染完成之后创建 */
    const scene = new Scene({
    /** 传入需要渲染的dom节点的id */
      id: 'china-map',
      /** 渲染的地图会有一个antv的logo,可以让其消失 */
      logoVisible: false,
      map: new Mapbox({
        center: [116.2825, 39.9],
        pitch: 0,
        /** 其实这是一张世界地图，通过blank将除中国外的地方变为空白 */
        zoom: 3,
        minZoom: 0,
        maxZoom: 10,
      }),
    });

    scene.on('loaded', () => {
      new CountryLayer(scene, {
      	/** 创建的数据，绑定到data字段进行渲染 */
        data: ProvinceData,
        joinBy: ['adcode', 'code'],
        depth: 1,
        /** 省界线颜色 */
        provinceStroke: '#fff',
        /** 省界线颜色宽度 */
        provinceStrokeWidth: 1,
        /** 市界线颜色 */
        cityStroke: '#EBCCB4',
        cityStrokeWidth: 1,
        /** 地图文字颜色 */
        label: {
        	/** 文字背景色 */
          stroke: 'rgba(0,0,0,0)',
          /** 文字颜色 */
          color: 'transparent',
        },
        fill: {
          color: {
       /** field 字段传入数据里面的具体值的字段名称 */
            field: 'value',
       /** 根据值的大小会渲染以下的颜色，值越大，会渲染数组靠后的颜色 */
            values: ['#BAE7FF', '#69C0FF', '#1890FF', '#0A73DA', '#004599'],
          },
        },
        /** 鼠标放上去的提示框内容渲染，相当于echarts的tooltip */
        popup: {
          enable: true,
          Html: (props: any) => {
            console.log(props);
            
            return `<span>${props.NAME_CHN}</span>:<span>${props.value}</span>`;
          },
        },
      });
    });
  };

  useEffect(() => {
    draw();
  }, []);

  return (
    <>
      <div id="china-map" >
        <div style={{ fontSize: '18px' }}>中国地理位置分布统计图</div>
      </div>
    </>
  );
};

export default Map