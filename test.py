# load_test.py
import asyncio
import aiohttp
import time

TARGET = "http://localhost:3600"
TOTAL_REQUESTS = 10000
CONCURRENCY = 200

completed = 0


async def fetch(session):
    global completed
    try:
        async with session.get(TARGET) as response:
            await response.text()
            completed += 1
    except:
        pass


async def worker():
    async with aiohttp.ClientSession() as session:
        tasks = []
        for _ in range(TOTAL_REQUESTS // CONCURRENCY):
            tasks.append(fetch(session))
        await asyncio.gather(*tasks)


async def main():
    start = time.time()
    await asyncio.gather(*[worker() for _ in range(CONCURRENCY)])
    duration = time.time() - start
    print(f"Completed: {completed}")
    print(f"Duration: {duration:.2f}s")
    print(f"TPS: {completed / duration:.2f}")


asyncio.run(main())