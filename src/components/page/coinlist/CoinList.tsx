import { useEffect, useState } from "react";
import GNB from "./gnb/GNB";
import {
  getAllCoinList,
  getBookmarkCoinList,
  numberWithCommas,
} from "../../../utils/utils";
import { ICoinBrief } from "../../../interface";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Dropdown from "../../dropdown/Dropdown";
import EmptyStar from "../../../assets/image/empty-star.png";
import Star from "../../../assets/image/star.png";
import Loading from "../../loading/Loading";
import ToastContainer from "../../toast/ToastContainer";

const CoinList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currency, setCurrency] = useState<string>("krw");
  const [perPage, setPerPage] = useState<string>("50");
  const [coinList, setCoinList] = useState<ICoinBrief[]>([]);
  const [bookmarks, setBookmarks] = useState<string>(
    localStorage.getItem("bookmarks") ?? ""
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toastList, setToastList] = useState<string[]>([]);

  const isBookmark = location.pathname.split("/")[2] === "bookmark";
  const callMoreCoinList = async (page: number) => {
    setIsLoading(true);
    if (page === 1) {
      setCoinList([]);
    }
    const result = await getAllCoinList(currency, perPage, page);
    console.log({ result, currency, perPage, page });
    if (page === 1) {
      setCoinList([...result]);
    } else {
      setCoinList([...coinList, ...result]);
    }
    setIsLoading(false);
  };
  const callBookmarkedCoinList = async () => {
    if (bookmarks.length > 0) {
      setIsLoading(true);
      const result = await getBookmarkCoinList(currency, bookmarks.split(","));
      setCoinList([...result.sort((a, b) => b.marketCap - a.marketCap)]);
      setIsLoading(false);
    } else {
      setCoinList([]);
    }
  };

  const handleClickBookmark = (id: string) => {
    const bookmarksArr = bookmarks?.split(",") ?? [];
    if (bookmarks?.includes(id)) {
      bookmarksArr.splice(bookmarksArr.indexOf(id), 1);
      localStorage.setItem("bookmarks", bookmarksArr.toString());
      setBookmarks(localStorage.getItem("bookmarks") ?? "");
      setToastList([...toastList, "북마크가 해제되었습니다."]);
    } else {
      localStorage.setItem("bookmarks", bookmarks + `${bookmarks && ","}${id}`);
      setBookmarks(localStorage.getItem("bookmarks") ?? "");
      setToastList([...toastList, "북마크가 설정되었습니다."]);
    }
  };
  useEffect(() => {
    if (isBookmark) {
      callBookmarkedCoinList();
    }
    if (!isBookmark) {
      callMoreCoinList(1);
    }
  }, [isBookmark, currency, perPage]);
  useEffect(() => {
    if (!isBookmark) {
      setCurrency("krw");
      setPerPage("50");
    }
  }, [isBookmark]);
  useEffect(() => {
    if (isBookmark) {
      callBookmarkedCoinList();
    }
  }, [bookmarks]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setToastList([]);
    }, 8000);
    return () => clearTimeout(timeout);
  }, [toastList]);

  return (
    <div>
      {isLoading && <Loading />}
      <ToastContainer toastList={toastList} />
      <GNB />
      {!isBookmark && (
        <SelectBox>
          <Dropdown
            onClickElement={setCurrency}
            title={`${currency.toUpperCase()} 보기`}
            elements={["krw", "usd"]}
          />
          <Dropdown
            onClickElement={setPerPage}
            title={`${perPage}개 보기`}
            elements={["10", "30", "50"]}
          />
        </SelectBox>
      )}
      <CoinListHeader>
        <div>
          <i />
          <div>자산</div>
        </div>
        <div></div>
        <div>Price</div>
        <div>1H</div>
        <div>24H</div>
        <div>7D</div>
        <div>24H Volume</div>
      </CoinListHeader>
      {coinList.map((coin) => {
        return (
          <CoinListElement
            id={coin.id}
            bookmarked={bookmarks.includes(coin.id)}
          >
            <div>
              <i onClick={() => handleClickBookmark(coin.id)} />
              <div onClick={() => navigate(`/detail/${coin.id}`)}>
                {coin.name}
              </div>
            </div>
            <div>{coin.symbol}</div>
            <div>{numberWithCommas(coin.currentPrice)}</div>
            <PriceChange change={coin.priceChange["1h"]}>
              {coin.priceChange["1h"].toFixed(1)}%
            </PriceChange>
            <PriceChange change={coin.priceChange["24h"]}>
              {coin.priceChange["24h"].toFixed(1)}%
            </PriceChange>
            <PriceChange change={coin.priceChange["7d"]}>
              {coin.priceChange["7d"].toFixed(1)}%
            </PriceChange>
            <div>
              {currency === "krw"
                ? "₩"
                : "$" + numberWithCommas(coin.totalVolume)}
            </div>
          </CoinListElement>
        );
      })}
      <div
        onClick={() => callMoreCoinList(coinList.length / Number(perPage) + 1)}
      >
        더보기
      </div>
    </div>
  );
};

const SelectBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  width: 100%;
`;

const CoinListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: lightgray;
  color: darkgray;
  height: 30px;
  > div:nth-child(1) {
    display: flex;
    width: 70px;
    > i:nth-child(1) {
      display: inline-block;
      width: 20px;
    }
    > div:nth-child(2) {
      width: 50px;
    }
  }
  > div:nth-child(2) {
    width: 30px;
  }
  > div:nth-child(3) {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    width: 50px;
  }
  > div:nth-child(4) {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    width: 20px;
  }
  > div:nth-child(5) {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    width: 20px;
  }
  > div:nth-child(6) {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    width: 20px;
  }
  > div:nth-child(7) {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    width: 100px;
  }
`;

const CoinListElement = styled.div<{ bookmarked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 30px;
  > div:nth-child(1) {
    display: flex;
    width: 70px;
    > i:nth-child(1) {
      display: block;
      width: 20px;
      height: 20px;
      background-image: ${(props) =>
        props.bookmarked ? `url(${Star})` : `url(${EmptyStar})`};
      background-size: cover;
    }
    > div:nth-child(2) {
      width: 50px;
    }
  }
  > div:nth-child(2) {
    width: 30px;
  }
  > div:nth-child(3) {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    width: 50px;
  }
  > div:nth-child(4) {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    width: 20px;
  }
  > div:nth-child(5) {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    width: 20px;
  }
  > div:nth-child(6) {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    width: 20px;
  }
  > div:nth-child(7) {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    width: 100px;
  }
`;

const PriceChange = styled.div<{ change: number }>`
  color: ${(props) => (props.change > 0 ? "red" : "blue")};
`;

export default CoinList;
