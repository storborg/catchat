from setuptools import setup, find_packages


requires = [
    "starlette[full]",
    "coloredlogs",
    "uvicorn",
]

setup(
    name="catchat",
    version="0.0",
    description="Chatty chat chat",
    long_description="",
    classifiers=[],
    url="http://github.com/storborg/catchat",
    keywords="",
    author="Scott Torborg",
    author_email="storborg@gmail.com",
    install_requires=requires,
    license="MIT",
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
    entry_points="""\
    [console_scripts]
    catchat-serve = catchat.cmd.serve:main
    """,
)
