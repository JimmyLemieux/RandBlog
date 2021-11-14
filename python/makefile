all: run

run:
	python3 main.py $u "$s" $i

cvenv:
	python3 -m venv NotionPy

svenv:
	source ./NotionPy/bin/activate

rvenv:
	rm -rf NotionPy

push:
	git add .
	git commit -m $m
	git push origin master -u

pull:
	git pull origin master
