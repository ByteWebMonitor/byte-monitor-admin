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
const colors = ['#B8E1FF', '#7DAAFF', '#3D76DD', '#0047A5', '#001D70'];


const Map: React.FC = () => {
  const draw = () => {
    const scene = new Scene({
      id: 'china-map',
      logoVisible: false,
      map: new Mapbox({
        center: [116.2825, 39.9],
        pitch: 0,
        style: 'blank',
        zoom: 3,
        minZoom: 0,
        maxZoom: 10
      })
    });

    scene.on('loaded', () => {
      new CountryLayer(scene, {
        data: ProvinceData,
        joinBy: ['NAME_CHN', 'name'],
        depth: 1,
        provinceStroke: '#fff',
        cityStroke: '#EBCCB4',
        cityStrokeWidth: 1,
        /** 地图文字颜色 */

        fill: {
          color: {
            field: 'NAME_CHN',
            values: colors
          }
        },
        popup: {
          enable: true,
          Html: props => {
            return `
              <span>${props.NAME_CHN}</span>
              <div>${props.value}</div>
            `;
          }
        },
        ao
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