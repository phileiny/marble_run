# Step 4 - 軌道設計

## 建立的檔案

### src/tracks/ClassicSlope.ts
S 型平緩下坡，4 段貝茲曲線

```
起點 ○
      ╲
       ╲
        ╲___
            ╲
             ╲
          ___╱
         ╱
        ○ 終點
```

### src/tracks/SingleLoop.ts
包含一個 360° 環形，7 段貝茲曲線

```
起點 ○
      ╲
       ╲
        ╲___○○○
            ○   ○
            ○   ○
            ○○○╱
               ╲
                ○ 終點
```

### src/tracks/DoubleLoop.ts
連續兩個大小不同的環形，11 段貝茲曲線

```
起點 ○
      ╲
       ○○○    ○○
       ○  ○   ○ ○
       ○  ○   ○ ○
       ○○○╱╲  ○○╱
              ╲
               ○ 終點
```

### src/tracks/TrackFactory.ts
軌道工廠，提供：
- `createTrack(type)` - 建立軌道
- `createCollectionBox(track)` - 建立回收盒
- `getAvailableTypes()` - 取得可用類型
- `getTrackInfo(type)` - 取得軌道資訊
