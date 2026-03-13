"use client"

const MyBucket = () => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetchGoals();
  }, []);

  async function fetchGoals() {
    const res = await fetch("/api/goals");
    const data = await res.json();
    setGoals(data);
  }

  return (
    <>
      {/* name of each tab group should be unique */}
      <div className="tabs tabs-box">
        <input
          type="radio"
          name="bucket_tabs"
          className="tab"
          aria-label="My Buckets"
        />
        <div className="tab-content bg-base-100 border-base-300 p-6"></div>

        <input
          type="radio"
          name="bucket_tabs"
          className="tab"
          aria-label="Complete"
          defaultChecked
        />
        <div className="tab-content bg-base-100 border-base-300 p-6"></div>

        <input
          type="radio"
          name="bucket_tabs"
          className="tab"
          aria-label="In Complete"
        />
        <div className="tab-content bg-base-100 border-base-300 p-6"></div>
      </div>
    </>
  );
};

export default MyBucket;
