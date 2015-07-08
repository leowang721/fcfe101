#!/usr/bin/env python
# -*- encoding:utf-8 -*-
################################################################################
#
# Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
#
################################################################################
"""
这个脚本读入一段文本文件，将其转换为一个JS module。即，原文本可以通过
require('<moduleName>')来拿到。
用法：
text2js.py <textFile> > <moduleName>.js
"""
import sys

def lineChunks(file, delim='\n'):
    """
    内部方法。
    用于for in 函数，根据传入的delim，分割文件并分块返回。
    Args:
        file: 文件对象
        delim: 分隔符，默认为\n
    Returns:
        string，一个文件块。
    """    
    buf = ""
    while True:
        c = file.read(1)
        if c == '': return
        buf += c
        if c == delim: 
            yield str(buf)
            buf = ""


if __name__ == "__main__":    
    # read in style.less, split with chunks splitted by a "}"
    with open(sys.argv[1], "r") as f:
        print "/* eslint-disable */"
        print "/* This file is auto generated. Don't edit. */"
        print "define(function(){return ''"
        for chunk in lineChunks(f):
            print "+'" + chunk.strip() + " '"
        print ";});"
